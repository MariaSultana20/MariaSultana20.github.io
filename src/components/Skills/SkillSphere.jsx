import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useInView } from 'framer-motion'
import * as THREE from 'three'
import { categoryColor } from '../../data/skills'

/*
  The 3D skill sphere (PLAN.md §3.5).
  This file is lazy-loaded by Skills.jsx, so three.js is only downloaded when
  the Skills section scrolls into view.

  SceneKit ↔ react-three-fiber:
    SCNView     → <Canvas>          (sets up the renderer, scene and camera)
    SCNNode     → <group>, <mesh>   (things in the scene)
    SCNText     → drei <Text>       (a 3D text label)
    renderer(_:updateAtTime:) / CADisplayLink → useFrame (runs every frame)
*/

const AUTO_ROTATE_SPEED = 0.3 // radians per second
const FRICTION = 0.95 // fraction of spin kept each frame (at 60 fps) after a drag ends
const DRAG_SENSITIVITY = 0.005 // radians of rotation per pixel dragged
const MAX_SPIN = 6 // radians per second, so a hard flick can't spin wildly
const HOVER_SCALE = 1.3
const DIM_OPACITY = 0.25
const FONT_URL = '/fonts/inter-latin-600.woff'

// Reused objects, so we don't create garbage 60 times a second.
const WHITE = new THREE.Color('#ffffff')
const X_AXIS = new THREE.Vector3(1, 0, 0)
const Y_AXIS = new THREE.Vector3(0, 1, 0)
const parentRotation = new THREE.Quaternion()

/**
 * Fibonacci sphere: spreads `count` points evenly over a sphere of `radius`.
 * Each point i gets a polar angle phi (top → bottom) and an azimuth theta that steps
 * by the "golden angle", so no two points line up. Spherical → x, y, z.
 */
function fibonacciPositions(count, radius) {
  return Array.from({ length: count }, (_, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    return new THREE.Vector3().setFromSphericalCoords(radius, phi, theta)
  })
}

// Frame-rate–independent smoothing factor: with speed 12 a value covers
// ~63% of the remaining distance every 1/12 s, whether the screen runs at 60 or 120 Hz.
const smoothing = (delta, speed = 12) => 1 - Math.exp(-delta * speed)

/** One skill name floating on the sphere. */
function SkillLabel({ name, color, position, fontSize, dimmed, onHoverChange }) {
  // useRef holds the three.js object without causing re-renders (like a stored property).
  const textRef = useRef(null)
  const isHovered = useRef(false)
  const hoverAmount = useRef(0) // 0 = normal, 1 = fully hovered

  const baseColor = useMemo(() => new THREE.Color(color), [color])
  const shownColor = useMemo(() => new THREE.Color(color), [color])

  useFrame(({ camera }, delta) => {
    const text = textRef.current
    if (!text) return

    // Billboarding: turn the label to face the camera.
    // PLAN.md says quaternion.copy(camera.quaternion). The labels sit inside a rotating
    // group, so we first undo the group's rotation: local = inverse(parent) × camera.
    text.parent.getWorldQuaternion(parentRotation).invert()
    text.quaternion.copy(parentRotation.multiply(camera.quaternion))

    // Ease the hover amount toward 1 or 0, then derive scale and colour from it.
    const t = smoothing(delta)
    hoverAmount.current = THREE.MathUtils.lerp(hoverAmount.current, isHovered.current ? 1 : 0, t)
    text.scale.setScalar(1 + (HOVER_SCALE - 1) * hoverAmount.current)
    text.color = shownColor.lerpColors(baseColor, WHITE, hoverAmount.current * 0.7)

    // Fade to 25% when another category is highlighted in the legend.
    text.fillOpacity = THREE.MathUtils.lerp(text.fillOpacity ?? 1, dimmed ? DIM_OPACITY : 1, t)
  })

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={fontSize}
      font={FONT_URL}
      anchorX="center"
      anchorY="middle"
      // r3f raycasts the pointer against 3D objects, so labels get hover events like DOM elements.
      onPointerOver={(event) => {
        event.stopPropagation() // only the front-most label under the pointer reacts
        isHovered.current = true
        onHoverChange(true)
      }}
      onPointerOut={() => {
        isHovered.current = false
        onHoverChange(false)
      }}
    >
      {name}
    </Text>
  )
}

/** All labels in one group, which is what rotates. */
function SkillCloud({ skills, radius, fontSize, activeCategory, autoRotate, dragRef, onHoverChange }) {
  const groupRef = useRef(null)
  const positions = useMemo(() => fibonacciPositions(skills.length, radius), [skills.length, radius])

  useFrame((_, delta) => {
    const group = groupRef.current
    const d = dragRef.current
    // A long pause (e.g. a background tab) can give a huge delta; cap it.
    const dt = Math.min(delta, 0.1)
    let spinX
    let spinY

    if (d.isDragging) {
      // Apply exactly what the finger/mouse moved since last frame...
      spinX = d.pendingX
      spinY = d.pendingY
      d.pendingX = 0
      d.pendingY = 0
      // ...and remember that speed (smoothed) for the momentum after release.
      if (dt > 0) {
        d.velocityX = THREE.MathUtils.lerp(d.velocityX, spinX / dt, 0.5)
        d.velocityY = THREE.MathUtils.lerp(d.velocityY, spinY / dt, 0.5)
      }
    } else {
      // Momentum: lose 5% of the spin per 60 fps frame, easing back to the auto-rotate speed.
      const keep = Math.pow(FRICTION, dt * 60)
      const targetY = autoRotate ? AUTO_ROTATE_SPEED : 0
      d.velocityX *= keep
      d.velocityY = targetY + (d.velocityY - targetY) * keep
      spinX = d.velocityX * dt
      spinY = d.velocityY * dt
    }

    d.velocityX = THREE.MathUtils.clamp(d.velocityX, -MAX_SPIN, MAX_SPIN)
    d.velocityY = THREE.MathUtils.clamp(d.velocityY, -MAX_SPIN, MAX_SPIN)

    // Rotate around the screen's axes, so dragging right always spins right.
    group.rotateOnWorldAxis(Y_AXIS, spinY)
    group.rotateOnWorldAxis(X_AXIS, spinX)
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillLabel
          key={skill.name}
          name={skill.name}
          color={categoryColor[skill.category]}
          position={positions[i]}
          fontSize={fontSize}
          dimmed={activeCategory !== null && skill.category !== activeCategory}
          onHoverChange={onHoverChange}
        />
      ))}
    </group>
  )
}

/**
 * Props:
 * - skills: the skills to show (Skills.jsx passes the core set on phones)
 * - radius, fontSize: smaller on phones
 * - activeCategory: category id highlighted in the legend, or null
 * - autoRotate: false when Reduce Motion is on
 * - fallback: shown if the browser can't do WebGL
 */
export default function SkillSphere({ skills, radius, fontSize, activeCategory, autoRotate, fallback }) {
  const wrapperRef = useRef(null)
  // Shared drag state. A ref (not state) because it changes on every pointer move
  // and must not trigger React re-renders.
  const dragRef = useRef({ isDragging: false, lastX: 0, lastY: 0, pendingX: 0, pendingY: 0, velocityX: 0, velocityY: 0 })

  // Only render frames while the sphere is on screen, to save battery.
  const isOnScreen = useInView(wrapperRef)

  // Pointer events cover mouse, touch and pen in one API (like UIPanGestureRecognizer).
  const onPointerDown = (event) => {
    dragRef.current.isDragging = true
    dragRef.current.lastX = event.clientX
    dragRef.current.lastY = event.clientY
    // Keep receiving moves even if the pointer leaves the sphere mid-drag.
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const onPointerMove = (event) => {
    const d = dragRef.current
    if (!d.isDragging) return
    d.pendingY += (event.clientX - d.lastX) * DRAG_SENSITIVITY // horizontal drag → spin around Y
    d.pendingX += (event.clientY - d.lastY) * DRAG_SENSITIVITY // vertical drag → tilt around X
    d.lastX = event.clientX
    d.lastY = event.clientY
  }
  const endDrag = () => {
    dragRef.current.isDragging = false
  }

  // A label calls this on hover in/out. An inline style beats the CSS `cursor: grab`.
  const setHoverCursor = (isHovering) => {
    wrapperRef.current.style.cursor = isHovering ? 'pointer' : ''
  }

  return (
    <div
      ref={wrapperRef}
      className="sphere"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag} // e.g. the browser took over the touch to scroll the page
    >
      <Canvas
        dpr={[1, 2]} // render at the screen's pixel ratio, capped at 2× (like UIScreen.scale)
        camera={{ position: [0, 0, 35], fov: 75 }}
        flat // no tone mapping, so the category colours render exactly as written
        frameloop={isOnScreen ? 'always' : 'never'}
        fallback={fallback}
        aria-hidden="true" // screen readers use the hidden list in Skills.jsx instead
      >
        {/* Fog fades labels on the far side of the sphere into the background. */}
        <fog attach="fog" args={['#050c14', 0, 70]} />
        <SkillCloud
          skills={skills}
          radius={radius}
          fontSize={fontSize}
          activeCategory={activeCategory}
          autoRotate={autoRotate}
          dragRef={dragRef}
          onHoverChange={setHoverCursor}
        />
      </Canvas>
    </div>
  )
}

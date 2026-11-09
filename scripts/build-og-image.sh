#!/bin/sh
# Renders scripts/og-image.html to public/og-image.jpg (1200×630) with headless Chrome (macOS).
# Usage: npm run og-image
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME_PATH:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP="$(mktemp -d)"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
  --window-size=1200,630 --virtual-time-budget=2000 \
  --screenshot="$TMP/og.png" "file://$PWD/scripts/og-image.html" 2>/dev/null
# PNG → JPEG: much smaller, and social sites recompress it anyway.
sips -s format jpeg -s formatOptions 85 "$TMP/og.png" --out public/og-image.jpg >/dev/null
rm -rf "$TMP"
echo "Wrote public/og-image.jpg"

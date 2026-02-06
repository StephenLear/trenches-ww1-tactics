#!/bin/bash

# Asset Generation Script for Trenches: WW1 Tactics
# This script converts SVG sources to required PNG formats

echo "==================================="
echo "Trenches: WW1 Tactics Asset Generator"
echo "==================================="

# Check if we're in the right directory
if [ ! -f "app.json" ]; then
    echo "Error: Please run this script from the project root directory"
    exit 1
fi

# Check for required tools
check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo "Warning: $1 is not installed."
        return 1
    fi
    return 0
}

echo ""
echo "Checking for conversion tools..."

# Try different SVG to PNG converters
CONVERTER=""

if check_tool "rsvg-convert"; then
    CONVERTER="rsvg"
    echo "Using rsvg-convert"
elif check_tool "inkscape"; then
    CONVERTER="inkscape"
    echo "Using Inkscape"
elif check_tool "convert"; then
    CONVERTER="imagemagick"
    echo "Using ImageMagick"
else
    echo ""
    echo "No SVG converter found. Please install one of the following:"
    echo "  - librsvg: brew install librsvg"
    echo "  - Inkscape: brew install inkscape"
    echo "  - ImageMagick: brew install imagemagick"
    echo ""
    echo "Alternatively, use an online converter:"
    echo "  1. Go to https://cloudconvert.com/svg-to-png"
    echo "  2. Upload assets/icon-source.svg"
    echo "  3. Set output size to 1024x1024"
    echo "  4. Download and save as assets/icon.png"
    echo ""
    echo "  5. Upload assets/splash-source.svg"
    echo "  6. Download and save as assets/splash-icon.png"
    exit 1
fi

echo ""
echo "Converting assets..."

# Convert based on available tool
case $CONVERTER in
    "rsvg")
        echo "Creating app icon (1024x1024)..."
        rsvg-convert -w 1024 -h 1024 assets/icon-source.svg > assets/icon.png

        echo "Creating adaptive icon (1024x1024)..."
        rsvg-convert -w 1024 -h 1024 assets/icon-source.svg > assets/adaptive-icon.png

        echo "Creating splash screen..."
        rsvg-convert -w 1284 -h 2778 assets/splash-source.svg > assets/splash-icon.png

        echo "Creating favicon (48x48)..."
        rsvg-convert -w 48 -h 48 assets/icon-source.svg > assets/favicon.png
        ;;

    "inkscape")
        echo "Creating app icon (1024x1024)..."
        inkscape assets/icon-source.svg --export-filename=assets/icon.png -w 1024 -h 1024

        echo "Creating adaptive icon (1024x1024)..."
        inkscape assets/icon-source.svg --export-filename=assets/adaptive-icon.png -w 1024 -h 1024

        echo "Creating splash screen..."
        inkscape assets/splash-source.svg --export-filename=assets/splash-icon.png -w 1284 -h 2778

        echo "Creating favicon (48x48)..."
        inkscape assets/icon-source.svg --export-filename=assets/favicon.png -w 48 -h 48
        ;;

    "imagemagick")
        echo "Creating app icon (1024x1024)..."
        convert -background none -resize 1024x1024 assets/icon-source.svg assets/icon.png

        echo "Creating adaptive icon (1024x1024)..."
        convert -background none -resize 1024x1024 assets/icon-source.svg assets/adaptive-icon.png

        echo "Creating splash screen..."
        convert -background none -resize 1284x2778 assets/splash-source.svg assets/splash-icon.png

        echo "Creating favicon (48x48)..."
        convert -background none -resize 48x48 assets/icon-source.svg assets/favicon.png
        ;;
esac

echo ""
echo "==================================="
echo "Asset generation complete!"
echo "==================================="
echo ""
echo "Generated files:"
echo "  - assets/icon.png (1024x1024) - App Store icon"
echo "  - assets/adaptive-icon.png (1024x1024) - Android adaptive icon"
echo "  - assets/splash-icon.png (1284x2778) - Splash screen"
echo "  - assets/favicon.png (48x48) - Web favicon"
echo ""
echo "Note: For iOS App Store submission, ensure icon.png:"
echo "  - Has no alpha channel (transparency)"
echo "  - Is exactly 1024x1024 pixels"
echo "  - Is in PNG format"
echo ""
echo "To remove alpha channel (if needed):"
echo "  convert assets/icon.png -background '#3d3d29' -flatten assets/icon.png"

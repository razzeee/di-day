#!/bin/bash
# Extracts translatable strings from Markdown files into POT files.
# Uses 'markdown-gettext' and 'msgcat'.

set -e

# Configuration
SRC_DIR="src/content"
POT_DIR="src/i18n/pot"

# Ensure output directory exists
mkdir -p "$POT_DIR"

# Check for python environment
if [ -f ".venv/bin/python" ]; then
    PYTHON=".venv/bin/python"
    MDGETTEXT=".venv/bin/markdown-gettext"
else
    PYTHON="python3"
    MDGETTEXT="markdown-gettext"
fi

echo "Starting extraction of translations from Markdown files..."

# Check for markdown-gettext
if ! command -v $MDGETTEXT &> /dev/null && [ ! -f "$MDGETTEXT" ]; then
    echo "Error: markdown-gettext command not found. Please install it (e.g. pip install git+https://github.com/PhuNH/markdown-gettext.git)"
    exit 1
fi

# Check for msgcat
if ! command -v msgcat &> /dev/null; then
    echo "Error: msgcat command not found (usually part of gettext package)."
    exit 1
fi

# Function to extract and merge
extract_component() {
    local component="$1"
    local input_dir="$SRC_DIR/$component/de"
    local output_pot="$POT_DIR/$component.pot"
    local temp_pot_dir="$POT_DIR/temp_$component"
    
    echo "  Processing '$component'..."
    
    mkdir -p "$temp_pot_dir"
    
    local pots=()
    
    for md_file in "$input_dir"/*.md; do
        local filename=$(basename "$md_file")
        local temp_pot="$temp_pot_dir/${filename}.pot"
        
        $MDGETTEXT extract "$md_file" "$temp_pot"
        pots+=("$temp_pot")
    done
    
    # Merge all temp POTs into one
    if [ ${#pots[@]} -gt 0 ]; then
        msgcat --no-wrap "${pots[@]}" -o "$output_pot"
    else
        echo "    No markdown files found in $input_dir"
    fi
    
    # Cleanup
    rm -rf "$temp_pot_dir"
}

extract_component "pages"
extract_component "recipes"

echo "Done. POT files are in $POT_DIR."

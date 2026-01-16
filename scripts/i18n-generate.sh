#!/bin/bash
# Generates translated Markdown files from PO files.
# Uses 'markdown-gettext'.

set -e

# Configuration
SRC_DIR="src/content"
PO_DIR="src/i18n/po"
SOURCE_LANG="de"
# Supported target languages. Add more as needed.
TARGET_LANGS=("en") 

# Check for python environment
if [ -f ".venv/bin/python" ]; then
    PYTHON=".venv/bin/python"
    MDGETTEXT=".venv/bin/markdown-gettext"
else
    PYTHON="python3"
    MDGETTEXT="markdown-gettext"
fi

# Check for markdown-gettext
if ! command -v $MDGETTEXT &> /dev/null && [ ! -f "$MDGETTEXT" ]; then
    echo "Error: markdown-gettext command not found."
    exit 1
fi

# Check if PO_DIR exists
if [ ! -d "$PO_DIR" ]; then
    echo "Error: Directory $PO_DIR does not exist."
    echo "Expected location for PO files: $PO_DIR/<lang>/<component>.po"
    exit 1
fi

echo "Generating translated content..."

for lang in "${TARGET_LANGS[@]}"; do
    echo "  Language: $lang"
    
    # Paths to PO files (Adjust naming convention if Weblate uses different pattern)
    PAGES_PO="$PO_DIR/$lang/pages.po"
    RECIPES_PO="$PO_DIR/$lang/recipes.po"
    
    # --- Process Pages ---
    DEST_DIR="$SRC_DIR/pages/$lang"
    
    if [ -f "$PAGES_PO" ]; then
        mkdir -p "$DEST_DIR"
        echo "    Generating Pages..."
        
        for source_file in "$SRC_DIR/pages/$SOURCE_LANG"/*.md; do
            filename=$(basename "$source_file")
            dest_file="$DEST_DIR/$filename"
            
            $MDGETTEXT generate "$source_file" "$PAGES_PO" "$dest_file"
        done
    else
        echo "    Skipping Pages (PO file not found: $PAGES_PO)"
    fi
    
    # --- Process Recipes ---
    DEST_DIR="$SRC_DIR/recipes/$lang"
    
    if [ -f "$RECIPES_PO" ]; then
        mkdir -p "$DEST_DIR"
        echo "    Generating Recipes..."
        
        for source_file in "$SRC_DIR/recipes/$SOURCE_LANG"/*.md; do
            filename=$(basename "$source_file")
            dest_file="$DEST_DIR/$filename"
            
            $MDGETTEXT generate "$source_file" "$RECIPES_PO" "$dest_file"
        done
    else
        echo "    Skipping Recipes (PO file not found: $RECIPES_PO)"
    fi
done

echo "Done."

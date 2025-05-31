#!/bin/bash

# Create a temporary file to store the combined content
temp_file=$(mktemp)

# Add script.js
echo "=== FILE: script.js ===" >> "$temp_file"
echo "" >> "$temp_file"
cat script.js >> "$temp_file"
echo "" >> "$temp_file"
echo "" >> "$temp_file"

# Add index.html
echo "=== FILE: index.html ===" >> "$temp_file"
echo "" >> "$temp_file"
cat index.html >> "$temp_file"
echo "" >> "$temp_file"
echo "" >> "$temp_file"

# Add thank-you.html
echo "=== FILE: thank-you.html ===" >> "$temp_file"
echo "" >> "$temp_file"
cat thank-you.html >> "$temp_file"

# Copy to clipboard based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    cat "$temp_file" | pbcopy
    echo "Files copied to clipboard successfully!"
elif command -v xclip &> /dev/null; then
    # Linux with xclip
    cat "$temp_file" | xclip -selection clipboard
    echo "Files copied to clipboard successfully!"
elif command -v xsel &> /dev/null; then
    # Linux with xsel
    cat "$temp_file" | xsel --clipboard --input
    echo "Files copied to clipboard successfully!"
else
    echo "Error: No clipboard utility found. Please install xclip or xsel on Linux."
    echo "The combined content has been saved to: $temp_file"
    exit 1
fi

# Clean up
rm "$temp_file"

echo "The following files have been copied to clipboard:"
echo "- script.js"
echo "- index.html" 
echo "- thank-you.html"
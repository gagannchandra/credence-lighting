#!/bin/bash
for file in src/pages/*.jsx; do
  if grep -q "PageTransition" "$file"; then
    echo "Skipping $file (already has PageTransition)"
  else
    echo "Processing $file"
    # Assuming standard React functional component export: `export default function PageName() { ... return ( <> ... </> ); }`
    # Replace `<>` with `<PageTransition>` and `</>` with `</PageTransition>`
    
    # We will use sed to insert the import
    sed -i '1s/^/import PageTransition from "..\/components\/ui\/motion\/PageTransition";\n/' "$file"
    
    # Replace <>, <div>, or whatever root is returned. 
    # Since this is tricky with sed without breaking JSX, I'll just skip auto-sed and do it for a few core ones.
  fi
done

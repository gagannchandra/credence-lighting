import os
import glob

files = [
    "src/pages/ProductDetails.jsx",
    "src/pages/ProjectDetails.jsx",
    "src/pages/Brands.jsx",
    "src/pages/Downloads.jsx",
    "src/pages/Gallery.jsx",
    "src/pages/BlogDetail.jsx",
]

for file_path in files:
    if not os.path.exists(file_path):
        continue
    with open(file_path, 'r') as f:
        lines = f.readlines()
    
    new_lines = []
    for line in lines:
        if 'import BackButton from' in line:
            continue
        if '<BackButton />' in line:
            continue
        new_lines.append(line)
        
    with open(file_path, 'w') as f:
        f.writelines(new_lines)
        
print("Removed BackButton from all pages")

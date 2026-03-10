import os, re

base_path = "/Users/almahmud/VisualiseDS/src/app/visualize"
files = [
    "stack/page.tsx", "queue/page.tsx", "linked-list/page.tsx",
    "tree/page.tsx", "search/page.tsx", "sorting/page.tsx",
    "bubble-sort/page.tsx", "hanoi/page.tsx"
]

for f in files:
    path = os.path.join(base_path, f)
    if not os.path.exists(path): continue
    with open(path, 'r') as file:
        content = file.read()
    
    # Fix the double className issue
    # Match <PremiumButton ... className="..." ... className="..." ... >
    # This is hard with regex if there are many props.
    # Let's just fix the specific duplicate className prop names first.
    
    # A safer way: find all PremiumButton tags, and for each, find ALL className="..." and merge them.
    def safer_fix(match):
        tag = match.group(0)
        # Find all className contents
        all_classes = []
        for m in re.finditer(r'className=["\']([^"\']*)["\']', tag):
            all_classes.extend(m.group(1).split())
        
        # Remove all existing className props
        tag = re.sub(r'\s*className=["\']([^"\']*)["\']', '', tag)
        
        # Add required ones
        reqs = ["h-14", "px-8", "text-base", "font-black"]
        # Deduplicate
        final_classes = []
        seen = set()
        # Remove old height classes
        all_classes = [c for c in all_classes if not re.match(r'h-\d+', c)]
        for c in reqs + all_classes:
            if c and c not in seen:
                final_classes.append(c)
                seen.add(c)
        
        # Reconstruction
        # Find where the tag name ends
        return tag.replace('<PremiumButton', f'<PremiumButton className="{" ".join(final_classes)}"')

    content = re.sub(r'<PremiumButton[^>]*>', safer_fix, content)
    
    # Also fix any double spaces created
    content = content.replace('  ', ' ')
    
    with open(path, 'w') as file:
        file.write(content)

print("Safer button fix applied")

import os, re

base_path = "/Users/almahmud/VisualiseDS/src/app/visualize"
files = [
    "stack/page.tsx", "queue/page.tsx", "linked-list/page.tsx",
    "tree/page.tsx", "search/page.tsx", "sorting/page.tsx",
    "bubble-sort/page.tsx", "hanoi/page.tsx"
]

def clean_tag(match):
    tag = match.group(0)
    # Extract all class names
    classes = re.findall(r'className="([^"]*)"', tag)
    # Remove all className attributes
    tag = re.sub(r'\s*className="[^"]*"', '', tag)
    
    # Merge classes and add requirements
    new_classes = "h-14 px-8 text-base font-black " + " ".join(classes)
    # Deduplicate classes while keeping order
    seen = set()
    deduped = []
    for c in new_classes.split():
        if c not in seen:
            deduped.append(c)
            seen.add(c)
    
    # Put it back
    return tag.replace('PremiumButton', f'PremiumButton className="{" ".join(deduped)}"')

for f in files:
    path = os.path.join(base_path, f)
    if not os.path.exists(path): continue
    with open(path, 'r') as file:
        content = file.read()
    
    content = re.sub(r'<PremiumButton[^>]*>', clean_tag, content)
    
    # Fix grid heights
    content = re.sub(r'lg:h-\[5\d\dpx\]', 'lg:h-[550px]', content)
    
    with open(path, 'w') as file:
        file.write(content)

print("Unified button styling and grid heights applied")

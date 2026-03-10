import os, re

base_path = "/Users/almahmud/VisualiseDS/src/app/visualize"
files = [
    "stack/page.tsx", "queue/page.tsx", "linked-list/page.tsx",
    "tree/page.tsx", "search/page.tsx", "sorting/page.tsx",
    "bubble-sort/page.tsx", "hanoi/page.tsx"
]

def clean_tag(match):
    tag = match.group(0)
    # Match both " and ' for className
    classes_matches = re.findall(r'className=["\']([^"\']*)["\']', tag)
    # Remove all className attributes
    tag = re.sub(r'\s*className=["\']([^"\']*)["\']', '', tag)
    
    # Requirements
    reqs = ["h-14", "px-8", "text-base", "font-black"]
    
    # Merge existing classes
    all_classes = []
    for m in classes_matches:
        all_classes.extend(m.split())
    
    # Filter out smaller height classes if we have h-14
    all_classes = [c for c in all_classes if not re.match(r'h-\d+', c)]
    
    combined = reqs + all_classes
    
    # Deduplicate
    seen = set()
    deduped = []
    for c in combined:
        if c and c not in seen:
            deduped.append(c)
            seen.add(c)
    
    # Insert at the beginning of the tag
    return tag.replace('<PremiumButton', f'<PremiumButton className="{" ".join(deduped)}"')

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

print("Robust button styling applied")

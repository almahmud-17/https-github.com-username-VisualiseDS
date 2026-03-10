import os, re

base_path = "/Users/almahmud/VisualiseDS/src/app/visualize"
files = [
    "stack/page.tsx",
    "queue/page.tsx",
    "linked-list/page.tsx",
    "tree/page.tsx",
    "search/page.tsx",
    "sorting/page.tsx",
    "bubble-sort/page.tsx",
    "hanoi/page.tsx"
]

for f in files:
    file_path = os.path.join(base_path, f)
    if not os.path.exists(file_path): continue
    
    with open(file_path, 'r') as file:
        content = file.read()
    
    # 1. Update button classes to be larger and font-black
    # Find PremiumButton and inject larger heights and black text
    content = content.replace('h-10', 'h-14 px-8 text-base font-black') # Make buttons consistently large
    content = content.replace('h-12', 'h-14 px-8 text-base font-black')
    
    # 2. Add scrollable class if missing to CodePanel container if needed, but the current layout uses h-[450px]
    # which makes it scrollable internally if content overflows.

    # 3. Increase grid height for the breakdown section
    content = content.replace('h-[450px]', 'h-[500px]')
    
    with open(file_path, 'w') as file:
        file.write(content)

print("Button updates and height adjustments applied")

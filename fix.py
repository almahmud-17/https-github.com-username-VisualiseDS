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
    
    # Fix the start of steps
    content = content.replace('steps={{{', 'steps={')
    content = content.replace('steps={{', 'steps={')
    
    # Fix the end of steps / start of complexity
    content = content.replace('}}} complexity={{{', '} complexity={')
    content = content.replace('}} complexity={{', '} complexity={')
    # Handle the mixed cases from previous manual/script attempts
    content = content.replace(']} complexity={', ']} complexity={') # No change needed here
    content = content.replace(']}} complexity={', ']} complexity={')
    content = content.replace(']}}} complexity={', ']} complexity={')
    
    # Fix the end of complexity
    content = content.replace('}}} />', '} />')
    content = content.replace('}} />', '} />')
    
    with open(file_path, 'w') as file:
        file.write(content)
print("Final Brute force fix applied")

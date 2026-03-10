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
    
    # Ensure PremiumButton has larger height and bold text
    # This regex looks for PremiumButton and adds/updates the className
    def fix_button(match):
        full_tag = match.group(0)
        if 'className="' in full_tag:
            # Update existing className
            # Remove any existing height classes first to avoid duplicates
            full_tag = re.sub(r'h-\d+', '', full_tag)
            full_tag = full_tag.replace('className="', 'className="h-14 px-8 text-base font-black ')
        else:
            # Add className
            full_tag = full_tag.replace('PremiumButton', 'PremiumButton className="h-14 px-8 text-base font-black"')
        return full_tag

    content = re.sub(r'<PremiumButton[^>]*>', fix_button, content)
    
    # Remove any extra spaces in className
    content = content.replace('className=" ', 'className="')
    content = content.replace('  ', ' ')
    
    # Fix the grid height again just in case
    content = content.replace('lg:h-[450px]', 'lg:h-[500px]')
    content = content.replace('lg:h-[500px]', 'lg:h-[550px]') # Make it even bigger as requested "algorithm box choto hoye gese"

    with open(file_path, 'w') as file:
        file.write(content)

print("Aggressive button and height updates applied")

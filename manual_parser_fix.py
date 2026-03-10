import os

base_path = "/Users/almahmud/VisualiseDS/src/app/visualize"
files = [
    "stack/page.tsx", "queue/page.tsx", "linked-list/page.tsx",
    "tree/page.tsx", "search/page.tsx", "sorting/page.tsx",
    "bubble-sort/page.tsx", "hanoi/page.tsx"
]

def fix_content(content):
    result = []
    i = 0
    while i < len(content):
        if content[i:i+15] == "<PremiumButton ":
            # Found a button, find the matching >
            start = i
            # We need to find the > that closes the tag.
            # In JSX, > can be inside { ... } or " ... ".
            # For simplicity, let's find the closing > of the component.
            # Usually it's followed by a newline or is the last > before a child.
            j = i + 15
            brace_count = 0
            in_quote = False
            quote_char = ''
            
            while j < len(content):
                c = content[j]
                if c in ['"', "'"] and content[j-1] != '\\':
                    if not in_quote:
                        in_quote = True
                        quote_char = c
                    elif quote_char == c:
                        in_quote = False
                elif not in_quote:
                    if c == '{': brace_count += 1
                    elif c == '}': brace_count -= 1
                    elif c == '>' and brace_count == 0:
                        break
                j += 1
            
            tag = content[start:j+1]
            
            # Now clean this tag
            import re
            classes = re.findall(r'className=["\']([^"\']*)["\']', tag)
            tag_no_classes = re.sub(r'\s*className=["\']([^"\']*)["\']', '', tag)
            
            # Required
            reqs = ["h-14", "px-8", "text-base", "font-black"]
            all_classes = []
            for c in classes: all_classes.extend(c.split())
            all_classes = [c for c in all_classes if not re.match(r'h-\d+', c)]
            
            final_classes = []
            seen = set()
            for c in reqs + all_classes:
                if c and c not in seen:
                    final_classes.append(c)
                    seen.add(c)
            
            # Reconstruct
            new_tag = tag_no_classes.replace('<PremiumButton', f'<PremiumButton className="{" ".join(final_classes)}"')
            result.append(new_tag)
            i = j + 1
        else:
            result.append(content[i])
            i += 1
    return "".join(result)

for f in files:
    path = os.path.join(base_path, f)
    if not os.path.exists(path): continue
    with open(path, 'r') as file:
        content = file.read()
    
    new_content = fix_content(content)
    
    # Fix grid heights
    import re
    new_content = re.sub(r'lg:h-\[5\d\dpx\]', 'lg:h-[550px]', new_content)
    
    with open(path, 'w') as file:
        file.write(new_content)

print("Manual parser fix applied")

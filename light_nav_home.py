import os

def replace_in_file(path, replacements):
    with open(path, 'r') as f:
        content = f.read()
    for o, n in replacements:
        content = content.replace(o, n)
    with open(path, 'w') as f:
        f.write(content)

replace_in_file('src/components/Navbar.tsx', [
    ('bg-white/5', 'bg-white/5 [.light_&]:bg-black/5'),
    ('border-white/10', 'border-white/10 [.light_&]:border-black/10'),
    ('hover:bg-white/10', 'hover:bg-white/10 [.light_&]:hover:bg-black/10'),
    ('bg-white/5 my-1', 'bg-white/5 [.light_&]:bg-black/10 my-1'),
    ('bg-primary/10', 'bg-primary/10 [.light_&]:bg-[#007AFF]/10'),
])

replace_in_file('src/app/page.tsx', [
    ('border-white/5', 'border-white/5 [.light_&]:border-black/5'),
    ('bg-blue-600/20', 'bg-blue-600/20 [.light_&]:bg-[#007AFF]/10'),
    ('bg-primary/5', 'bg-primary/5 [.light_&]:bg-[#007AFF]/5'),
    ('border-primary/20', 'border-primary/20 [.light_&]:border-[#007AFF]/20'),
    ('hover:border-primary/40', 'hover:border-primary/40 [.light_&]:hover:border-[#007AFF]/40'),
    ('text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary/80 animate-gradient', 'text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary/80 [.light_&]:from-[#007AFF] [.light_&]:via-[#6E6BFF] [.light_&]:to-[#A855F7] animate-gradient'),
])

print("Navbar and homepage styles updated.")

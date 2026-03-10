import os
import re

def patch_file(path, replacements):
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return
    with open(path, 'r') as f:
        content = f.read()
    
    original = content
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    if content != original:
        with open(path, 'w') as f:
            f.write(content)
        print(f"Patched: {path}")

# 1. Update LogicBreakdown for premium adaptivity
patch_file("/Users/almahmud/VisualiseDS/src/components/LogicBreakdown.tsx", {
    'border-[#ec4899]/30': 'border-[#ec4899]/30 [.light_&]:border-[#007AFF]/20',
    'bg-[#131127]': 'bg-[#131127] [.light_&]:bg-white/70',
    'bg-[#ec4899]/10': 'bg-[#ec4899]/10 [.light_&]:bg-[#007AFF]/10',
    'border-[#ec4899]/20': 'border-[#ec4899]/20 [.light_&]:border-[#007AFF]/20',
    'text-[#f671b5]': 'text-[#f671b5] [.light_&]:text-[#007AFF]',
    'text-[#ec4899]': 'text-[#ec4899] [.light_&]:text-[#007AFF]',
    'shadow-[0_0_50px_rgba(236,72,153,0.1)]': 'shadow-[0_0_50px_rgba(236,72,153,0.1)] [.light_&]:shadow-xl',
    'bg-[#131127] [.light_&]:bg-white/80': 'bg-[#131127] [.light_&]:bg-white/70',
})

# 2. Update VisualizerCanvas for higher contrast bars
patch_file("/Users/almahmud/VisualiseDS/src/components/VisualizerCanvas.tsx", {
    'bg-primary/40 text-primary-foreground border-primary/20': 'bg-indigo-500/40 [.light_&]:bg-[#007AFF]/60 text-white border-white/10 [.light_&]:border-black/5 shadow-lg',
    'bg-white/[0.01] rounded-2xl': 'bg-white/[0.03] [.light_&]:bg-black/[0.02] rounded-3xl',
    'backgroundImage: \'radial-gradient(circle, white 1px, transparent 1px)\'': 'backgroundImage: `radial-gradient(circle, ${theme === "dark" ? "white" : "black"} 1px, transparent 1px)`', # This won't work easily without theme hook, let's use CSS class
    'className="absolute inset-0 opacity-[0.03] pointer-events-none"': 'className="absolute inset-0 opacity-[0.05] [.light_&]:opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-[size:32px_32px] text-white [.light_&]:text-black"',
})

# 3. Handle Sorting page contrast
patch_file("/Users/almahmud/VisualiseDS/src/app/visualize/sorting/page.tsx", {
    'text-white/[0.02]': 'text-white/[0.03] [.light_&]:text-black/[0.05]',
})

# 4. Handle Search page contrast (if exists)
patch_file("/Users/almahmud/VisualiseDS/src/app/visualize/search/page.tsx", {
    'text-white/[0.02]': 'text-white/[0.03] [.light_&]:text-black/[0.05]',
})

print("Component adaptive colors patched.")

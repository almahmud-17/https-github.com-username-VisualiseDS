import os, re

base = "/Users/almahmud/VisualiseDS/src/app/visualize"

def process_file(path, replacements):
    if not os.path.exists(path): return
    with open(path, 'r') as f: content = f.read()
    for o, n in replacements:
        content = content.replace(o, n)
    with open(path, 'w') as f: f.write(content)

# Stack
process_file(f"{base}/stack/page.tsx", [
    ('bg-gradient-to-r from-primary to-indigo-600', 'bg-gradient-to-r from-primary to-indigo-600 [.light_&]:!bg-none [.light_&]:!bg-[#1F2937]'),
    ('border-white/10 text-xl', 'border-white/10 [.light_&]:!border-transparent [.light_&]:shadow-md text-xl [.light_&]:!text-white'),
])

# Queue
process_file(f"{base}/queue/page.tsx", [
    ('bg-gradient-to-br from-emerald-500 to-teal-600 text-white', 'bg-gradient-to-br from-emerald-500 to-teal-600 [.light_&]:!bg-none [.light_&]:!bg-[#1F2937] text-white'),
    ('border border-white/10 relative group', 'border border-white/10 [.light_&]:!border-transparent relative group'),
])

# LinkedList
process_file(f"{base}/linked-list/page.tsx", [
    ('bg-primary text-primary-foreground border-2 border-primary/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]', 'bg-primary text-primary-foreground border-2 border-primary/50 shadow-[0_0_20px_rgba(99,102,241,0.3)] [.light_&]:!bg-[#007AFF] [.light_&]:!border-transparent'),
    ('bg-white/5 border-2 border-white/10 text-foreground', 'bg-white/5 border-2 border-white/10 [.light_&]:!bg-[#1F2937] [.light_&]:!border-transparent text-foreground [.light_&]:!text-white'),
    ('bg-white/20', 'bg-white/20 [.light_&]:!bg-[#94A3B8]'),
    ('className="w-16 h-1 bg-white/20', 'className="w-16 h-1 bg-white/20 [.light_&]:!bg-[#94A3B8]'),
])

# Search
process_file(f"{base}/search/page.tsx", [
    ('bg-emerald-500 border-emerald-400 text-white', 'bg-emerald-500 border-emerald-400 text-white [.light_&]:!bg-[#34C759] [.light_&]:!border-[#34C759]'),
    ('bg-primary border-primary text-white', 'bg-primary border-primary text-white [.light_&]:!bg-[#007AFF] [.light_&]:!border-[#007AFF]'),
    ('bg-blue-500/20 border-blue-500 text-blue-400', 'bg-blue-500/20 border-blue-500 text-blue-400 [.light_&]:!bg-[#8B5CF6] [.light_&]:!border-[#8B5CF6] [.light_&]:!text-white'),
    ('bg-white/5 border-white/10 text-foreground/50 opacity-40', 'bg-white/5 border-white/10 [.light_&]:!bg-[#1F2937] [.light_&]:!border-transparent text-foreground/50 opacity-40 [.light_&]:!text-white/50'),
    ('bg-white/10 border-white/20 text-foreground', 'bg-white/10 border-white/20 [.light_&]:!bg-[#1F2937] [.light_&]:!border-transparent [.light_&]:!text-white text-foreground'),
])

# Sorting
process_file(f"{base}/sorting/page.tsx", [
    ('bg-emerald-500 border-emerald-400', 'bg-emerald-500 border-emerald-400 [.light_&]:!bg-[#34C759] [.light_&]:!border-[#34C759] [.light_&]:!text-white'),
    ('bg-rose-500 border-rose-400', 'bg-rose-500 border-rose-400 [.light_&]:!bg-[#FF3B30] [.light_&]:!border-[#FF3B30] [.light_&]:!text-white'),
    ('bg-primary border-primary shadow-[0_0_20px_rgba(99,102,241,0.5)]', 'bg-primary border-primary shadow-[0_0_20px_rgba(99,102,241,0.5)] [.light_&]:!bg-[#007AFF] [.light_&]:!border-[#007AFF] [.light_&]:!shadow-md [.light_&]:!text-white'),
    ('bg-white/10 border-white/20 hover:bg-white/20', 'bg-white/10 border-white/20 hover:bg-white/20 [.light_&]:!bg-[#1F2937] [.light_&]:!border-transparent hover:[.light_&]:!bg-[#1ab8ff] [.light_&]:!text-white'),
])

# Bubble Sort
process_file(f"{base}/bubble-sort/page.tsx", [
    ('bg-emerald-500 border-emerald-400', 'bg-emerald-500 border-emerald-400 [.light_&]:!bg-[#34C759] [.light_&]:!border-[#34C759] [.light_&]:!text-white'),
    ('bg-rose-500 border-rose-400', 'bg-rose-500 border-rose-400 [.light_&]:!bg-[#FF3B30] [.light_&]:!border-[#FF3B30] [.light_&]:!text-white'),
    ('bg-primary border-primary', 'bg-primary border-primary [.light_&]:!bg-[#007AFF] [.light_&]:!border-[#007AFF] [.light_&]:!text-white'),
    ('bg-white/10 border-white/20', 'bg-white/10 border-white/20 [.light_&]:!bg-[#1F2937] [.light_&]:!border-transparent [.light_&]:!text-white'),
])

# Tree
process_file(f"{base}/tree/page.tsx", [
    ('bg-emerald-500 border-emerald-400', 'bg-emerald-500 border-emerald-400 [.light_&]:!bg-[#34C759] [.light_&]:!border-[#34C759] [.light_&]:!text-white'),
    ('bg-rose-500 border-rose-400', 'bg-rose-500 border-rose-400 [.light_&]:!bg-[#FF3B30] [.light_&]:!border-[#FF3B30] [.light_&]:!text-white'),
    ('bg-primary border-primary', 'bg-primary border-primary [.light_&]:!bg-[#007AFF] [.light_&]:!border-[#007AFF] [.light_&]:!text-white'),
    ('bg-white/5 border-white/10', 'bg-white/5 border-white/10 [.light_&]:!bg-[#1F2937] [.light_&]:!border-transparent [.light_&]:!text-white'),
])

print("Nodes processed successfully")

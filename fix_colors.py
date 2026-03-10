import os, re

base = "/Users/almahmud/VisualiseDS/src/app/visualize"

def process_file(path, replacements):
    if not os.path.exists(path): return
    with open(path, 'r') as f: content = f.read()
    for o, n in replacements:
        content = content.replace(o, n)
    with open(path, 'w') as f: f.write(content)

# LinkedList
process_file(f"{base}/linked-list/page.tsx", [
    ('bg-slate-950/40', 'bg-slate-950/40 [.light_&]:!bg-black/5'),
    ('animate={{\n            opacity: 1, scale: 1, y: 0,\n            borderColor: highlightedId === node.id ? "rgba(99, 102, 241, 1)" : "rgba(255, 255, 255, 0.1)",\n            backgroundColor: highlightedId === node.id ? "rgba(99, 102, 241, 0.2)" : "rgba(30, 41, 59, 0.6)"\n           }}', 'animate={{ opacity: 1, scale: 1, y: 0 }}'),
    ('className="rounded-xl flex flex-row items-stretch border-2 relative shadow-2xl backdrop-blur-md overflow-hidden min-w-[6rem] md:min-w-[8rem] h-16 md:h-20"', 'className={cn("rounded-xl transition-colors duration-300 flex flex-row items-stretch border-2 relative shadow-2xl backdrop-blur-md overflow-hidden min-w-[6rem] md:min-w-[8rem] h-16 md:h-20", highlightedId === node.id ? "border-primary bg-primary/20 [.light_&]:liquid-node-active" : "border-white/10 bg-slate-800/60 [.light_&]:liquid-node")}'),
    ('<ArrowLeftRight className="text-white/30"', '<ArrowLeftRight className="text-white/30 [.light_&]:text-[#94A3B8]"'),
    ('<ArrowRight className="text-white/30"', '<ArrowRight className="text-white/30 [.light_&]:text-[#94A3B8]"'),
    ('text-cyan-500', 'text-cyan-500 [.light_&]:text-purple-600'),
    ('text-foreground', 'text-foreground [.light_&]:!text-black'),
    ('bg-white/5', 'bg-white/5 [.light_&]:bg-black/5'),
])

# Search
process_file(f"{base}/search/page.tsx", [
    ('bg-black/20', 'bg-black/20 [.light_&]:bg-black/5'),
])

# Stack
process_file(f"{base}/stack/page.tsx", [
    ('bg-white/[0.02]', 'bg-white/[0.02] [.light_&]:bg-black/5'),
    ('border-white/10', 'border-white/10 [.light_&]:border-black/10'),
    ('text-primary-foreground', 'text-primary-foreground [.light_&]:!text-black'),
])

# Queue
process_file(f"{base}/queue/page.tsx", [
    ('text-white', 'text-white [.light_&]:!text-black'),
])

# Tree
process_file(f"{base}/tree/page.tsx", [
    ('text-white', 'text-white [.light_&]:!text-black'),
    ('bg-black/20', 'bg-black/20 [.light_&]:bg-black/5'),
])

# Sorting
process_file(f"{base}/sorting/page.tsx", [
    ('bg-black/20', 'bg-black/20 [.light_&]:bg-black/5'),
    ('border-white/20', 'border-white/20 [.light_&]:border-black/20'),
])

print("Visualizer colors fixed for light mode.")

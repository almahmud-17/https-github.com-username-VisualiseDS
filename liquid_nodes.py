import os, re

base = "/Users/almahmud/VisualiseDS/src/app/visualize"

def process_file(path, replacements):
    if not os.path.exists(path): return
    with open(path, 'r') as f: content = f.read()
    for o, n in replacements:
        content = content.replace(o, n)
    with open(path, 'w') as f: f.write(content)

process_file(f"{base}/stack/page.tsx", [
    ('[.light_&]:!bg-[#1F2937]', ''),
    ('[.light_&]:!bg-none', '[.light_&]:liquid-node'),
    ('[.light_&]:!border-transparent', ''),
    ('[.light_&]:shadow-md', ''),
    ('[.light_&]:!text-white', ''),
])

process_file(f"{base}/queue/page.tsx", [
    ('[.light_&]:!bg-[#1F2937]', ''),
    ('[.light_&]:!bg-none', '[.light_&]:liquid-node'),
    ('[.light_&]:!border-transparent', ''),
])

process_file(f"{base}/linked-list/page.tsx", [
    ('[.light_&]:!bg-[#007AFF] [.light_&]:!border-transparent', '[.light_&]:liquid-node-active'),
    ('[.light_&]:!bg-[#1F2937] [.light_&]:!border-transparent text-foreground [.light_&]:!text-white', '[.light_&]:liquid-node text-foreground'),
    ('[.light_&]:!bg-[#94A3B8]', '[.light_&]:!bg-[#94A3B8]'),
])

process_file(f"{base}/tree/page.tsx", [
    ('[.light_&]:!bg-[#34C759] [.light_&]:!border-[#34C759] [.light_&]:!text-white', '[.light_&]:liquid-node-success'),
    ('[.light_&]:!bg-[#FF3B30] [.light_&]:!border-[#FF3B30] [.light_&]:!text-white', '[.light_&]:liquid-node-danger'),
    ('[.light_&]:!bg-[#007AFF] [.light_&]:!border-[#007AFF] [.light_&]:!text-white', '[.light_&]:liquid-node-active'),
    ('[.light_&]:!bg-[#1F2937] [.light_&]:!border-transparent [.light_&]:!text-white', '[.light_&]:liquid-node'),
])

process_file(f"{base}/search/page.tsx", [
    ('[.light_&]:!bg-[#34C759] [.light_&]:!border-[#34C759]', '[.light_&]:liquid-node-success'),
    ('[.light_&]:!bg-[#007AFF] [.light_&]:!border-[#007AFF]', '[.light_&]:liquid-node-active'),
    ('[.light_&]:!bg-[#8B5CF6] [.light_&]:!border-[#8B5CF6] [.light_&]:!text-white', '[.light_&]:liquid-node-secondary'),
    ('[.light_&]:!bg-[#1F2937] [.light_&]:!border-transparent', '[.light_&]:liquid-node'),
    ('[.light_&]:!text-white/50', ''),
    ('[.light_&]:!text-white', ''),
])

process_file(f"{base}/sorting/page.tsx", [
    ('[.light_&]:!bg-[#34C759] [.light_&]:!border-[#34C759] [.light_&]:!text-white', '[.light_&]:liquid-node-success'),
    ('[.light_&]:!bg-[#FF3B30] [.light_&]:!border-[#FF3B30] [.light_&]:!text-white', '[.light_&]:liquid-node-danger'),
    ('[.light_&]:!bg-[#007AFF] [.light_&]:!border-[#007AFF] [.light_&]:!shadow-md [.light_&]:!text-white', '[.light_&]:liquid-node-active'),
    ('[.light_&]:!bg-[#1F2937] [.light_&]:!border-transparent hover:[.light_&]:!bg-[#1ab8ff] [.light_&]:!text-white', '[.light_&]:liquid-node hover:[.light_&]:liquid-node-active'),
])

process_file(f"{base}/bubble-sort/page.tsx", [
    ('[.light_&]:!bg-[#34C759] [.light_&]:!border-[#34C759] [.light_&]:!text-white', '[.light_&]:liquid-node-success'),
    ('[.light_&]:!bg-[#FF3B30] [.light_&]:!border-[#FF3B30] [.light_&]:!text-white', '[.light_&]:liquid-node-danger'),
    ('[.light_&]:!bg-[#007AFF] [.light_&]:!border-[#007AFF] [.light_&]:!text-white', '[.light_&]:liquid-node-active'),
    ('[.light_&]:!bg-[#1F2937] [.light_&]:!border-transparent [.light_&]:!text-white', '[.light_&]:liquid-node'),
])

print("Liquid nodes applied to ALL visualizations")

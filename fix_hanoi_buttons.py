import os

# Fix PremiumButton.tsx
btn_path = "/Users/almahmud/VisualiseDS/src/components/ui/PremiumButton.tsx"
with open(btn_path, 'r') as f:
    btn = f.read()

btn = btn.replace(
    'primary: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]",',
    'primary: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)] [.light_&]:liquid-button",'
)
btn = btn.replace(
    'secondary: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]",',
    'secondary: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)] [.light_&]:liquid-button",'
)
btn = btn.replace(
    'danger: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.2)]",',
    'danger: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.2)] [.light_&]:liquid-button",'
)
btn = btn.replace(
    'gradient: "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)]",',
    'gradient: "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] [.light_&]:liquid-button",'
)
btn = btn.replace('"[.light_&]:liquid-button",', '')

with open(btn_path, 'w') as f:
    f.write(btn)

# Fix hanoi/page.tsx
hanoi_path = "/Users/almahmud/VisualiseDS/src/app/visualize/hanoi/page.tsx"
with open(hanoi_path, 'r') as f:
    hanoi = f.read()

# Panel backgrounds
hanoi = hanoi.replace('bg-black/20', 'bg-black/20 [.light_&]:bg-black/5')
hanoi = hanoi.replace('bg-black/40', 'bg-black/40 [.light_&]:bg-black/5')
hanoi = hanoi.replace('border-white/5', 'border-white/5 [.light_&]:border-black/5')

# Text overrides
hanoi = hanoi.replace('text-pink-400', 'text-pink-400 [.light_&]:text-purple-600')
hanoi = hanoi.replace('bg-pink-500/20', 'bg-pink-500/20 [.light_&]:bg-purple-600/10')
hanoi = hanoi.replace('bg-pink-500/10', 'bg-pink-500/10 [.light_&]:bg-purple-600/10')
hanoi = hanoi.replace('bg-pink-500/5', 'bg-pink-500/5 [.light_&]:bg-purple-600/5')
hanoi = hanoi.replace('shadow-pink-500/20', 'shadow-pink-500/20 [.light_&]:shadow-purple-600/20')
hanoi = hanoi.replace('bg-pink-500', 'bg-pink-500 [.light_&]:bg-purple-600')

# Hanoi visualizer canvas 
hanoi = hanoi.replace('text-white/[0.01]', 'text-white/[0.01] [.light_&]:text-black/[0.03]')
hanoi = hanoi.replace('from-pink-500/20 to-pink-500/5', 'from-pink-500/20 to-pink-500/5 [.light_&]:from-slate-500/40 [.light_&]:to-slate-500/5')
hanoi = hanoi.replace('bg-white/10', 'bg-white/10 [.light_&]:bg-black/10')
hanoi = hanoi.replace('border-white/10', 'border-white/10 [.light_&]:border-black/10')
hanoi = hanoi.replace('text-white/10', 'text-white/10 [.light_&]:text-black/30')

# Make sure white text on the disks is preserved strongly
hanoi = hanoi.replace('text-white/80', 'text-white/80 [.light_&]:!text-white')

with open(hanoi_path, 'w') as f:
    f.write(hanoi)

print("Hanoi and PremiumButton updated")

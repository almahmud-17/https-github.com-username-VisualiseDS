import os

hanoi_path = '/Users/almahmud/VisualiseDS/src/app/visualize/hanoi/page.tsx'
with open(hanoi_path, 'r') as f:
    content = f.read()

# Make the accent color Apple Blue in light mode
content = content.replace('[.light_&]:text-purple-600', '[.light_&]:text-[#007AFF]')
content = content.replace('[.light_&]:bg-purple-600/10', '[.light_&]:bg-[#007AFF]/10')
content = content.replace('[.light_&]:bg-purple-600/5', '[.light_&]:bg-[#007AFF]/5')
content = content.replace('[.light_&]:shadow-purple-600/20', '[.light_&]:shadow-[#007AFF]/20')
content = content.replace('[.light_&]:bg-purple-600', '[.light_&]:bg-[#007AFF]')
content = content.replace('[.light_&]:accent-purple-600', '[.light_&]:accent-[#007AFF]')

# The user mentioned alignment. The "Solve Puzzle" and "Reset State" buttons may be pushed.
# Make the Layout better by making sure labels and values are perfectly aligned.
# Currently: <div className="grid grid-cols-1 gap-3 mt-2">
# Let's adjust to give them distinct visual separation.

with open(hanoi_path, 'w') as f:
    f.write(content)

print("Hanoi page colors updated to Apple Blue for Light Mode.")

import sys

def process(file_path):
    with open(file_path, 'r') as f:
        c = f.read()
    c = c.replace('dark:bg', 'bg').replace('dark:text', 'text').replace('dark:blur', 'blur').replace('light:', '[.light_&]:')
    with open(file_path, 'w') as f:
        f.write(c)

process('src/components/LogicBreakdown.tsx')
process('src/components/BackgroundElements.tsx')
process('src/components/ui/PremiumButton.tsx')

with open('/Users/almahmud/VisualiseDS/src/app/globals.css', 'r') as f:
    css = f.read()

css = css.replace('color: #0F172A !important;', 'color: #000000 !important; font-weight: 900 !important;')
css = css.replace('color: #007AFF !important;', 'color: #000000 !important; font-weight: 900 !important;')
css = css.replace('color: #28a745 !important;', 'color: #000000 !important; font-weight: 900 !important;')
css = css.replace('color: #FF3B30 !important;', 'color: #000000 !important; font-weight: 900 !important;')
css = css.replace('color: #8B5CF6 !important;', 'color: #000000 !important; font-weight: 900 !important;')

with open('/Users/almahmud/VisualiseDS/src/app/globals.css', 'w') as f:
    f.write(css)

print("Nodes text colors updated to full black in global css")

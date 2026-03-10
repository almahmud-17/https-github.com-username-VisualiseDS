import os
import re

CSS = """@import "tailwindcss";

@theme {
  --color-primary: var(--theme-primary);
  --color-primary-foreground: #FFFFFF;
  --color-accent: var(--theme-accent);
  --color-accent-foreground: #FFFFFF;
  --color-success: var(--theme-success);
  --color-danger: var(--theme-danger);
  --color-node-normal: var(--theme-node-normal);
  --color-node-active: var(--theme-node-active);
  --color-node-visited: var(--theme-node-visited);
  --color-edge: var(--theme-edge);

  /* Syntax Highlighting */
  --color-sh-keyword: #ff7b72;
  --color-sh-function: #d2a8ff;
  --color-sh-string: #a5d6ff;
  --color-sh-number: #79c0ff;
  --color-sh-comment: #8b949e;
  --color-sh-class: #f2cc60;

  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono-vscode: "JetBrains Mono", monospace;
  
  --radius-apple: 20px;
}

@layer base {
  :root {
    --background: #0F172A;
    --bg-image: none;
    --foreground: #F8FAFC;
    --foreground-muted: #94A3B8;
    --foreground-secondary: #CBD5E1;
    
    --card-bg: rgba(30, 41, 59, 0.4);
    --border-color: rgba(255, 255, 255, 0.05);
    --glass-bg: rgba(255, 255, 255, 0.05);
    
    --theme-primary: #6366F1;
    --theme-accent: #22C55E;
    --theme-success: #10B981;
    --theme-danger: #EF4444;
    
    --button-gradient: linear-gradient(135deg, var(--theme-primary), #8B5CF6);
    --card-shadow: none;
    --card-radius: 1.5rem;
    
    --theme-node-normal: #1E293B;
    --theme-node-active: var(--theme-primary);
    --theme-node-visited: #8B5CF6;
    --theme-edge: #475569;
  }

  :root.light {
    --background: #F5F7FF;
    --bg-image: linear-gradient(135deg, #F5F7FF, #EEF2FF, #E9ECFF);
    --foreground: #0F172A;
    --foreground-muted: #94A3B8;
    --foreground-secondary: #475569;
    
    --card-bg: rgba(255, 255, 255, 0.55);
    --border-color: rgba(255, 255, 255, 0.35);
    --glass-bg: rgba(255, 255, 255, 0.55);
    
    --theme-primary: #007AFF; /* Apple Blue */
    --theme-accent: #6E6BFF; /* Soft Purple */
    --theme-success: #34C759;
    --theme-danger: #FF3B30;
    
    --button-gradient: linear-gradient(135deg, #6E6BFF, #A855F7);
    --card-shadow: 0 10px 30px rgba(0,0,0,0.08);
    --card-radius: 20px;
    
    --theme-node-normal: #1F2937;
    --theme-node-active: #007AFF;
    --theme-node-visited: #8B5CF6;
    --theme-edge: #94A3B8;
  }

  body {
    background-color: var(--background);
    background-image: var(--bg-image);
    color: var(--foreground);
    @apply antialiased min-h-screen transition-colors duration-500;
    font-family: var(--font-sans);
  }
}

@utility glass {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
}

@utility glass-card {
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
}

@utility apple-button {
  background: var(--button-gradient);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.4);
  transition: all 0.2s ease;
  border-radius: 14px;
}

.font-mono-vscode {
  font-family: var(--font-mono-vscode);
}

/* Custom Scrollbar */
@layer base {
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(128, 128, 128, 0.2);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary);
  }
}
"""

with open("/Users/almahmud/VisualiseDS/src/app/globals.css", "w") as f:
    f.write(CSS)

print("Updated globals.css completely")

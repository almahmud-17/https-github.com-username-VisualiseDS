import os

css_append = """
@utility liquid-node {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.8) !important;
  box-shadow: 
    inset 0 2px 5px rgba(255, 255, 255, 0.8),
    0 10px 20px rgba(0, 0, 0, 0.05) !important;
  color: #0F172A !important;
}

@utility liquid-node-active {
  background: linear-gradient(180deg, rgba(0, 122, 255, 0.2) 0%, rgba(0, 122, 255, 0.05) 100%) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(0, 122, 255, 0.5) !important;
  box-shadow: 
    inset 0 2px 5px rgba(255, 255, 255, 0.5),
    0 10px 20px rgba(0, 122, 255, 0.15) !important;
  color: #007AFF !important;
}

@utility liquid-node-success {
  background: linear-gradient(180deg, rgba(52, 199, 89, 0.2) 0%, rgba(52, 199, 89, 0.05) 100%) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(52, 199, 89, 0.5) !important;
  box-shadow: 
    inset 0 2px 5px rgba(255, 255, 255, 0.5),
    0 10px 20px rgba(52, 199, 89, 0.15) !important;
  color: #28a745 !important;
}

@utility liquid-node-danger {
  background: linear-gradient(180deg, rgba(255, 59, 48, 0.2) 0%, rgba(255, 59, 48, 0.05) 100%) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 59, 48, 0.5) !important;
  box-shadow: 
    inset 0 2px 5px rgba(255, 255, 255, 0.5),
    0 10px 20px rgba(255, 59, 48, 0.15) !important;
  color: #FF3B30 !important;
}

@utility liquid-node-secondary {
  background: linear-gradient(180deg, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.05) 100%) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(139, 92, 246, 0.5) !important;
  box-shadow: 
    inset 0 2px 5px rgba(255, 255, 255, 0.5),
    0 10px 20px rgba(139, 92, 246, 0.15) !important;
  color: #8B5CF6 !important;
}
"""

with open("/Users/almahmud/VisualiseDS/src/app/globals.css", "a") as f:
    f.write(css_append)

print("Globals.css liquid styles appended")

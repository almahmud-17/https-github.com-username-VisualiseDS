"use client";

import { PremiumButton } from "@/components/ui/PremiumButton";
import { TREE_LABELS, TREE_TYPES, type TreeType } from "@/trees";

interface TreeTypeTabsProps {
  active: TreeType;
  onChange: (type: TreeType) => void;
}

export function TreeTypeTabs({ active, onChange }: TreeTypeTabsProps) {
  return (
    <div className="w-full flex overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-white/5 [.light_&]:border-black/5">
      {TREE_TYPES.map((t) => (
        <PremiumButton
          key={t}
          variant={active === t ? "primary" : "secondary"}
          onClick={() => onChange(t)}
          className="text-xs px-5 py-2 whitespace-nowrap"
        >
          {TREE_LABELS[t]}
        </PremiumButton>
      ))}
    </div>
  );
}

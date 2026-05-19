"use client";

import { BrandLogo } from "./BrandLogo";

export function BrandFooter() {
  return (
    <footer className="mt-20 pb-10 flex flex-col items-center gap-4">
      <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <BrandLogo variant="footer" asLink={false} className="opacity-90 hover:opacity-100 transition-opacity" />
      <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground/70">
        Visual learning for data structures & algorithms
      </p>
    </footer>
  );
}

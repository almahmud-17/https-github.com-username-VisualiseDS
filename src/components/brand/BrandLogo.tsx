"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type BrandVariant = "navbar" | "footer" | "hero" | "icon";

interface BrandLogoProps {
  variant?: BrandVariant;
  showText?: boolean;
  className?: string;
  asLink?: boolean;
}

const LOGO_BOX: Record<BrandVariant, string> = {
  navbar: "h-9 min-w-[4.5rem] px-2 py-1",
  footer: "h-11 min-w-[5.5rem] px-2.5 py-1",
  hero: "h-14 sm:h-16 min-w-[7rem] sm:min-w-[8rem] px-3 py-1.5",
  icon: "h-8 min-w-[3.5rem] px-1.5 py-0.5",
};

const LOGO_IMG: Record<BrandVariant, { width: number; height: number; className: string }> = {
  navbar: { width: 88, height: 28, className: "h-6 w-auto" },
  footer: { width: 100, height: 32, className: "h-7 w-auto" },
  hero: { width: 140, height: 44, className: "h-9 sm:h-10 w-auto" },
  icon: { width: 72, height: 24, className: "h-5 w-auto" },
};

const TEXT: Record<BrandVariant, { title: string; by: string }> = {
  navbar: { title: "text-sm sm:text-base", by: "text-[10px]" },
  footer: { title: "text-base", by: "text-xs" },
  hero: { title: "text-xl sm:text-2xl", by: "text-sm" },
  icon: { title: "text-sm", by: "text-[10px]" },
};

function BrandContent({
  variant,
  showText,
  className,
}: Pick<BrandLogoProps, "variant" | "showText" | "className">) {
  const v = variant ?? "navbar";
  const img = LOGO_IMG[v];
  const text = TEXT[v];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "torch-logo-box shrink-0 flex items-center justify-center rounded-lg bg-black border border-white/10",
          LOGO_BOX[v]
        )}
      >
        <Image
          src="/torch-logo.png"
          alt="torchR logo"
          width={img.width}
          height={img.height}
          className={cn("object-contain object-center", img.className)}
          priority={v === "navbar" || v === "hero"}
        />
      </div>
      {showText !== false && (
        <div className="flex flex-col leading-tight min-w-0">
          <span
            className={cn(
              "font-bold text-foreground tracking-tight truncate",
              text.title
            )}
          >
            DS Visualizer
          </span>
          <span className={cn("text-muted-foreground font-medium", text.by)}>
            by{" "}
            <span className="text-primary font-bold tracking-wide">torchR</span>
          </span>
        </div>
      )}
    </div>
  );
}

export function BrandLogo({
  variant = "navbar",
  showText = true,
  className,
  asLink = true,
}: BrandLogoProps) {
  const content = (
    <BrandContent variant={variant} showText={showText} className={className} />
  );

  if (!asLink) return content;

  return (
    <Link
      href="/"
      className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
      aria-label="DS Visualizer by torchR — Home"
    >
      {content}
    </Link>
  );
}

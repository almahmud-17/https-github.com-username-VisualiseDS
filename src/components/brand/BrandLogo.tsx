"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type BrandVariant = "navbar" | "footer" | "hero" | "icon";

interface BrandLogoProps {
  variant?: BrandVariant;
  showText?: boolean;
  showMark?: boolean;
  className?: string;
  asLink?: boolean;
}

/** Full TORCH wordmark visible — height-led, no crop/zoom */
const MARK_SIZE: Record<BrandVariant, { h: string; w: number; px: number }> = {
  navbar: { h: "h-[22px] sm:h-[24px]", w: 128, px: 22 },
  footer: { h: "h-[24px]", w: 136, px: 24 },
  hero: { h: "h-[28px] sm:h-[32px]", w: 168, px: 28 },
  icon: { h: "h-[20px]", w: 112, px: 20 },
};

const TEXT: Record<BrandVariant, { title: string; by: string }> = {
  navbar: { title: "text-sm sm:text-base", by: "text-[10px] sm:text-[11px]" },
  footer: { title: "text-base", by: "text-xs" },
  hero: { title: "text-xl sm:text-2xl", by: "text-sm" },
  icon: { title: "text-sm", by: "text-[10px]" },
};

function TorchMark({ variant }: { variant: BrandVariant }) {
  const s = MARK_SIZE[variant];
  return (
    <Image
      src="/torch-logo.svg"
      alt=""
      width={s.w}
      height={s.px}
      className={cn(
        "torch-logo-mark shrink-0 object-contain object-left",
        s.h
      )}
      priority={variant === "navbar" || variant === "hero"}
    />
  );
}

function BrandContent({
  variant,
  showText,
  showMark,
  className,
}: Pick<BrandLogoProps, "variant" | "showText" | "showMark" | "className">) {
  const v = variant ?? "navbar";
  const text = TEXT[v];

  return (
    <div className={cn("flex items-center gap-2.5 sm:gap-3", className)}>
      {showMark !== false && <TorchMark variant={v} />}
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
            <span className="text-foreground font-bold tracking-wide">torchR</span>
          </span>
        </div>
      )}
    </div>
  );
}

export function BrandLogo({
  variant = "navbar",
  showText = true,
  showMark = true,
  className,
  asLink = true,
}: BrandLogoProps) {
  const content = (
    <BrandContent
      variant={variant}
      showText={showText}
      showMark={showMark}
      className={className}
    />
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

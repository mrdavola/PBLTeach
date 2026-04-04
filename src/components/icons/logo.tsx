import { cn } from "@/lib/utils";

function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="6" fill="#0D9488" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="14"
        fill="#ffffff"
      >
        PBL
      </text>
    </svg>
  );
}

export function PBLTeachLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display font-bold text-2xl tracking-tight",
        className
      )}
    >
      <LogoMark size={28} />
      <span>
        <span className="text-brand-teal">PBL</span>
        <span className="text-neutral-900">Teach</span>
      </span>
    </span>
  );
}

export function PBLTeachLogoSmall({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-display font-bold text-xl tracking-tight",
        className
      )}
    >
      <LogoMark size={22} />
      <span>
        <span className="text-brand-teal">PBL</span>
        <span className="text-neutral-900">Teach</span>
      </span>
    </span>
  );
}

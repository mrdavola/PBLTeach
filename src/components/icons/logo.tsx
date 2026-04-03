import { cn } from "@/lib/utils";

export function PBLTeachLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display font-bold text-2xl tracking-tight",
        className
      )}
    >
      <span className="text-brand-teal">PBL</span>
      <span className="text-neutral-900">Teach</span>
    </span>
  );
}

export function PBLTeachLogoSmall({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display font-bold text-xl tracking-tight",
        className
      )}
    >
      <span className="text-brand-teal">PBL</span>
      <span className="text-neutral-900">Teach</span>
    </span>
  );
}

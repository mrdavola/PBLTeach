interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
}

const defaultProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SingleDayIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Single Day",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-label={ariaLabel}
      role="img"
      {...defaultProps}
    >
      {/* Clock face */}
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function MicroIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Micro Project",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-label={ariaLabel}
      role="img"
      {...defaultProps}
    >
      {/* Small calendar with 3 day squares */}
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
      {/* 3 small squares for days */}
      <rect x="6" y="12" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="15" y="12" width="3" height="3" rx="0.5" fill="currentColor" />
    </svg>
  );
}

export function MiniIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Mini Project",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-label={ariaLabel}
      role="img"
      {...defaultProps}
    >
      {/* Calendar with week view - 5 filled squares */}
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
      {/* Week of days */}
      <rect x="5" y="11.5" width="2.5" height="2.5" rx="0.5" fill="currentColor" />
      <rect x="8.5" y="11.5" width="2.5" height="2.5" rx="0.5" fill="currentColor" />
      <rect x="12" y="11.5" width="2.5" height="2.5" rx="0.5" fill="currentColor" />
      <rect x="15.5" y="11.5" width="2.5" height="2.5" rx="0.5" fill="currentColor" />
      <rect x="5" y="15.5" width="2.5" height="2.5" rx="0.5" fill="currentColor" />
      <rect x="8.5" y="15.5" width="2.5" height="2.5" rx="0.5" fill="currentColor" />
      <rect x="12" y="15.5" width="2.5" height="2.5" rx="0.5" fill="currentColor" />
    </svg>
  );
}

export function FullIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Full Project",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-label={ariaLabel}
      role="img"
      {...defaultProps}
    >
      {/* Calendar with month view - filled grid */}
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
      {/* Full grid of filled squares */}
      <rect x="5" y="11" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="8.5" y="11" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="12" y="11" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="15.5" y="11" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="5" y="14.5" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="8.5" y="14.5" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="12" y="14.5" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="15.5" y="14.5" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="5" y="18" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="8.5" y="18" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="12" y="18" width="2" height="2" rx="0.5" fill="currentColor" />
    </svg>
  );
}

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

export function EntryEventIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Entry Event",
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
      <path d="M12 2c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10Z" />
      <path d="M12 18v4" />
      <path d="M9 22h6" />
    </svg>
  );
}

export function InvestigationIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Investigation",
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
      <circle cx="10" cy="10" r="7" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <text
        x="10"
        y="13"
        textAnchor="middle"
        fontSize="9"
        fill="currentColor"
        stroke="none"
        fontWeight="bold"
      >
        ?
      </text>
    </svg>
  );
}

export function ProblemIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Problem / Design Challenge",
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="2" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="22" />
      <line x1="2" y1="12" x2="7" y2="12" />
      <line x1="17" y1="12" x2="22" y2="12" />
    </svg>
  );
}

export function CreateIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Create",
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
      {/* Pencil */}
      <path d="M3 21l1.5-4.5L17 4l3 3L7.5 19.5Z" />
      <path d="M14 7l3 3" />
      {/* Gear */}
      <circle cx="19" cy="15" r="2.5" />
      <path d="M19 11.5v1" />
      <path d="M19 17.5v1" />
      <path d="M15.5 15h1" />
      <path d="M21.5 15h1" />
    </svg>
  );
}

export function ShareIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Share",
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
      <circle cx="12" cy="20" r="2" />
      <path d="M8 14a8 8 0 0 1 8 0" />
      <path d="M5 9a14 14 0 0 1 14 0" />
      <path d="M2 4a20 20 0 0 1 20 0" />
    </svg>
  );
}

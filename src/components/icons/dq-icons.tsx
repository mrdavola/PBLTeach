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

export function RoleIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Role",
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
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

export function ActionIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Action",
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="15 8 19 12 15 16" />
      {/* Motion lines */}
      <line x1="3" y1="8" x2="7" y2="8" />
      <line x1="3" y1="16" x2="7" y2="16" />
    </svg>
  );
}

export function ProductIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Product",
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
      {/* Cube / box */}
      <path d="M12 2l9 5v10l-9 5-9-5V7l9-5Z" />
      <path d="M12 12l9-5" />
      <path d="M12 12l-9-5" />
      <path d="M12 12v10" />
    </svg>
  );
}

export function AudienceIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Audience",
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
      {/* Center person */}
      <circle cx="12" cy="7" r="3" />
      <path d="M7 21v-1a5 5 0 0 1 10 0v1" />
      {/* Left person */}
      <circle cx="5" cy="9" r="2.5" />
      <path d="M2 21v-1a3.5 3.5 0 0 1 5-3.1" />
      {/* Right person */}
      <circle cx="19" cy="9" r="2.5" />
      <path d="M22 21v-1a3.5 3.5 0 0 0-5-3.1" />
    </svg>
  );
}

export function PurposeIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Purpose",
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
      {/* Target */}
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      {/* Arrow hitting center */}
      <path d="M22 2L17 7" />
      <path d="M18 2h4v4" />
    </svg>
  );
}

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

export function ChallengingProblemIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Challenging Problem",
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
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}

export function SustainedInquiryIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Sustained Inquiry",
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
      {/* Looping arrow indicating ongoing */}
      <path d="M7 7c2-2 5-2 6 0" />
      <path d="M13 5v2h-2" />
    </svg>
  );
}

export function AuthenticityIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Authenticity",
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
      {/* Globe */}
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="4" ry="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  );
}

export function StudentVoiceIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Student Voice & Choice",
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
      {/* Person */}
      <circle cx="8" cy="6" r="3" />
      <path d="M4 20v-2a4 4 0 0 1 4-4h0" />
      {/* Speech bubble */}
      <path d="M14 9h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2l-2 2v-2h-2a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function ReflectionIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Reflection",
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
      {/* Circular arrow */}
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <polyline points="21 3 21 9 15 9" />
    </svg>
  );
}

export function CritiqueRevisionIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Critique & Revision",
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
      {/* Two speech bubbles */}
      <path d="M3 5h10a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H7l-2 2v-2H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
      <path d="M11 13h7a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2l-2 2v-2h-3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z" />
      {/* Edit marks */}
      <line x1="5" y1="8" x2="11" y2="8" />
      <line x1="13" y1="16" x2="17" y2="16" />
    </svg>
  );
}

export function PublicProductIcon({
  size = 24,
  className,
  "aria-label": ariaLabel = "Public Product",
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
      {/* Presentation screen */}
      <rect x="2" y="3" width="20" height="13" rx="1" />
      <line x1="12" y1="16" x2="12" y2="20" />
      <line x1="8" y1="20" x2="16" y2="20" />
      {/* Play triangle */}
      <polygon points="10,7 10,13 15,10" />
    </svg>
  );
}

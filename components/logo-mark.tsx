type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className = "" }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="FFSET Lounge" className={className}>
      <defs>
        <radialGradient id="logo-mark-bg" cx="50%" cy="36%" r="78%">
          <stop offset="0%" stopColor="#1e1416" />
          <stop offset="100%" stopColor="#0a0708" />
        </radialGradient>
        <linearGradient id="logo-mark-mono" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f1d191" />
          <stop offset="55%" stopColor="#d5aa4d" />
          <stop offset="100%" stopColor="#ab3f59" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" fill="url(#logo-mark-bg)" />
      <circle cx="32" cy="32" r="29.5" fill="none" stroke="rgba(213,170,77,0.4)" strokeWidth="1" />

      <text
        x="32"
        y="39.5"
        textAnchor="middle"
        fontFamily="'Iowan Old Style','Palatino Linotype','Book Antiqua',Georgia,serif"
        fontWeight="700"
        fontSize="28"
        letterSpacing="-1.5"
        fill="url(#logo-mark-mono)"
      >
        FF
      </text>

      <path d="M21 46.5 H43" stroke="rgba(213,170,77,0.55)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

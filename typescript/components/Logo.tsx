interface LogoProps {
  size?: number
}

/**
 * Logomarca My Hype: raio em degradê (violeta -> magenta -> âmbar)
 * dentro de um quadrado arredondado escuro — energia + cultura digital.
 */
export function Logo({ size = 42 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logomarca My Hype"
    >
      <defs>
        <linearGradient id="hype-gradient" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7c3aed" />
          <stop offset="0.5" stopColor="#ec4899" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#181228" stroke="url(#hype-gradient)" strokeWidth="3" />
      <path
        d="M35 10 L18 36 L30 36 L27 54 L46 27 L33 27 Z"
        fill="url(#hype-gradient)"
        stroke="#f5f3ff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

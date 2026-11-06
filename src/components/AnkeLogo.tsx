import React, { useRef, useState } from 'react';

export const AnkeLogo: React.FC<{ className?: string }> = ({ className = 'h-7 w-auto' }) => (
  <svg
    viewBox="0 0 151 284"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M119.437 0.00294718C126.393 0.0199472 133.519 0.359947 139.808 3.33695C140.574 3.69895 141.341 4.09495 142.09 4.52595C146.088 6.82295 148.934 10.7619 150.141 15.2139C150.396 16.1539 150.593 17.0929 150.741 18.0409C151.801 24.8729 149.568 32.4569 144.803 37.4629C140.042 42.4649 133.267 43.9449 126.365 43.8879C117.286 43.8129 107.906 42.8649 98.9937 43.5549C82.2686 44.8479 69.1384 62.3109 79.4659 75.5409C89.9072 88.9149 110.121 101.131 113.828 113.651C115.681 123.768 114.933 133.051 109.199 141.495C94.5034 159.085 51.5011 147.962 44.2081 171.186C35.4933 198.936 78.4128 200.53 93.9729 203.722C107.091 206.485 117.801 210.107 126.876 218.102C134.654 224.957 139.356 234.815 140.364 245.139C141.436 256.11 139.719 267.717 133.519 275.802C123.196 286.838 109.974 286.627 98.3972 275.802C91.423 267.378 97.369 253.443 88.915 246.742C81.2884 240.697 65.8741 240.232 56.5469 238.713C32.9175 234.748 9.76265 218.19 2.12199 193.469C-1.43107 181.975 -0.358391 169.693 4.11733 158.488C7.44258 150.851 14.5936 143.305 21.7467 137.261C32.3509 128.303 45.9537 124.74 59.4035 121.321C61.7576 120.723 63.4681 120.025 63.8688 119.175C65.3676 116 53.7862 107.328 52.2005 105.736C39.7728 93.0699 31.6865 80.6919 31.2718 61.9549C31.2738 45.0779 36.9711 32.8779 47.7642 20.4949C67.8975 0.671948 93.784 -0.0590528 119.437 0.00294718Z"
      fill="#FDE047"
    />
  </svg>
);

interface SpotlightShellProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export const SpotlightShell: React.FC<SpotlightShellProps> = ({
  children,
  className = '',
  innerClassName = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const isFullHeight = className.includes('h-full') || innerClassName.includes('h-full');
  const resolvedInnerClassName = isFullHeight && !innerClassName.includes('h-full')
    ? `h-full ${innerClassName}`
    : innerClassName;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`double-bezel-shell relative overflow-hidden ${className}`}
    >
      {/* Dynamic cursor-tracking yellow spotlight border/surface highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(460px circle at ${pos.x}px ${pos.y}px, rgba(253, 224, 71, 0.16), transparent 40%)`,
        }}
      />
      <div className={`double-bezel-core relative z-10 ${resolvedInnerClassName}`}>
        {children}
      </div>
    </div>
  );
};

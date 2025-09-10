import React from "react";

export default function Spinner({ size = 40, className = "" }) {
  const sizePx = `${size}px`;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-block ${className}`}
    >
      <svg
        style={{ width: sizePx, height: sizePx }}
        className="animate-spin"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* light gray track */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="6"
        />
        {/* black arc */}
        <path
          d="M45 25a20 20 0 00-20-20"
          stroke="black"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

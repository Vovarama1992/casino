import React from 'react';

export default function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="45"
      height="25"
      viewBox="0 0 45 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 2L22.5 23L43 2"
        stroke="#4F2A9A"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

"use client";

import * as React from "react";

type RippleProps = {
  className?: string;
};

export function Ripple({ className }: RippleProps) {
  return (
    <div className={["absolute inset-0", className].filter(Boolean).join(" ")}>
      <div className="ripple-layer" />
      <div className="ripple-layer ripple-layer--2" />
      <div className="ripple-layer ripple-layer--3" />
      <style jsx>{`
        .ripple-layer {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 38rem;
          height: 38rem;
          transform: translate(-50%, -50%) scale(0.2);
          border-radius: 9999px;
          border: 1px solid rgba(24, 24, 27, 0.22);
          opacity: 0;
          animation: ripple 3.2s ease-out infinite;
        }

        .ripple-layer--2 {
          animation-delay: 0.85s;
          border-color: rgba(8, 145, 178, 0.26);
        }

        .ripple-layer--3 {
          animation-delay: 1.7s;
          border-color: rgba(8, 145, 178, 0.18);
        }

        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0.15);
            opacity: 0;
          }
          14% {
            opacity: 0.85;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}


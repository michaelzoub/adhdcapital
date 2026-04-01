export function DiscoverEye({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-none bg-[var(--color-accent-purple)] text-white ring-1 ring-white/10 ${className}`}
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-95">
        <path
          d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7zM12 17a5 5 0 110-10 5 5 0 010 10z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

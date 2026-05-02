import Link from "next/link";

export default function FourOhFourPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">404</p>
      <h1 className="mt-3 font-sans text-xl font-semibold text-zinc-900">Page not found</h1>
      <Link
        href="/"
        className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-800 hover:text-cyan-950"
      >
        ← Home
      </Link>
    </main>
  );
}

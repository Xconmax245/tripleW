import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-32 sm:py-48 text-center">
      <h1 className="font-display text-6xl sm:text-8xl tracking-tight text-muted/30 mb-6">
        404
      </h1>
      <p className="font-display text-2xl sm:text-3xl tracking-tight mb-3">
        Page Not Found
      </p>
      <p className="text-muted font-body text-sm sm:text-base mb-10 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block border border-foreground px-8 py-3 text-sm uppercase tracking-[0.15em] font-body hover:bg-foreground hover:text-background transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}

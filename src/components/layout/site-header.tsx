import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-black/[.08] dark:border-white/[.145]">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Dev Yantra
        </Link>
      </div>
    </header>
  );
}

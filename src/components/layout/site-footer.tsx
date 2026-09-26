export function SiteFooter() {
  return (
    <footer className="border-t border-black/[.08] dark:border-white/[.145]">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center px-6 text-sm text-zinc-600 dark:text-zinc-400">
        © {new Date().getFullYear()} Dev Yantra
      </div>
    </footer>
  );
}

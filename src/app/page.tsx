export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-16">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Developer tools that just work.
        </h1>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Dev Yantra is a growing collection of fast, simple, browser-based
          utilities for everyday development tasks — no sign-up, no backend,
          just tools that do exactly what they say.
        </p>
      </section>

      <section className="mt-12 flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Tools</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          No tools published yet. The first one is on its way.
        </p>
      </section>
    </div>
  );
}

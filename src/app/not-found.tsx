import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-5">
      <div className="text-center">
        <p className="font-mono text-sm text-muted">404</p>
        <h1 className="mt-4 text-5xl font-medium tracking-[-0.04em] sm:text-6xl">
          There&apos;s nothing at this address.
        </h1>
        <div className="mt-10">
          <Button href="/">Back home</Button>
        </div>
      </div>
    </main>
  );
}

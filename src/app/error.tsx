'use client';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="store-error-page"><span>Storefront</span><h1>Something went wrong.</h1><p>Please try again in a moment.</p><button type="button" onClick={reset}>Try again</button></main>;
}

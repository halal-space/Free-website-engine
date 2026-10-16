import Link from 'next/link';

export default function NotFound() {
  return <main className="store-error-page"><span>404</span><h1>We couldn&apos;t find that page.</h1><p>The link may have changed, or this product may no longer be available.</p><Link href="/">Back to the store</Link></main>;
}

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { loadStorefrontByHost, renderStorefront, storefrontMetadata } from '@/engine/server-render';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ segments?: string[] }>; searchParams: Promise<{ q?: string }> };

async function load(props: Props) {
  const [{ segments = [] }, search, requestHeaders] = await Promise.all([props.params, props.searchParams, headers()]);
  const host = requestHeaders.get('host') || '';
  if ((host.startsWith('localhost') || host.startsWith('127.0.0.1')) && segments.length === 0) redirect('/studio');
  return loadStorefrontByHost(host, segments, search.q || '');
}

export async function generateMetadata(props: Props) { return storefrontMetadata(await load(props)); }
export default async function PublicStorefrontPage(props: Props) { return renderStorefront(await load(props), ''); }

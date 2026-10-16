import { loadStorefront, storefrontMetadata } from '@/engine/server-render';
import { PreviewBridge } from '@/engine/ui/PreviewBridge';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ storeId: string; segments?: string[] }>; searchParams: Promise<{ q?: string }> };

async function load(props: Props) {
  const [{ storeId, segments = [] }, search] = await Promise.all([props.params, props.searchParams]);
  return loadStorefront(storeId, segments, search.q || '');
}

export async function generateMetadata(props: Props) { return storefrontMetadata(await load(props), true); }
export default async function StorePreviewPage(props: Props) {
  const { storeId } = await props.params;
  const loaded = await load(props);
  return <PreviewBridge {...loaded} basePath={`/stores/${storeId}`} />;
}

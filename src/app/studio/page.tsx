import { MOCK_STORES } from '@/engine/mock-data';
import { getMockPublishedSnapshot } from '@/engine/mock-publishing';
import { Studio } from '@/engine/ui/Studio';

export const metadata = { title: 'Storefront Studio | Rooqx', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default function StudioPage() {
  const stores = Object.fromEntries(Object.keys(MOCK_STORES).map(id => [id, getMockPublishedSnapshot(id) ?? MOCK_STORES[id]]));
  return <Studio stores={stores} canPublish={process.env.NODE_ENV !== 'production' && process.env.STOREFRONT_MODE !== 'api'} />;
}

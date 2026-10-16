'use client';

import { useEffect, useState } from 'react';
import { assemblePage } from '../assemble';
import { assertSnapshot } from '../validation';
import type { PagePlan, StorefrontConfig, StorefrontSnapshot } from '../types';
import { Storefront } from './Storefront';

export function PreviewBridge({ snapshot, plan, basePath }: { snapshot: StorefrontSnapshot; plan: PagePlan; basePath: string }) {
  const [draft, setDraft] = useState<StorefrontConfig | null>(null);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== window.parent) return;
      const message = event.data as { type?: unknown; storeId?: unknown; config?: unknown } | null;
      if (message?.type !== 'rooqx-preview' || message.storeId !== snapshot.merchant.id) return;
      try {
        const candidate = { ...snapshot, config: message.config };
        assertSnapshot(candidate, snapshot.merchant.id);
        setDraft(candidate.config);
      } catch { /* Invalid preview messages do not change the storefront. */ }
    };
    window.addEventListener('message', receive);
    window.parent.postMessage({ type: 'rooqx-preview-ready', storeId: snapshot.merchant.id }, window.location.origin);
    return () => window.removeEventListener('message', receive);
  }, [snapshot]);
  const nextSnapshot = draft ? { ...snapshot, config: draft } : snapshot;
  const nextPlan = draft ? assemblePage(nextSnapshot, plan.route) : plan;
  return nextPlan ? <Storefront snapshot={nextSnapshot} plan={nextPlan} basePath={basePath} demo /> : null;
}

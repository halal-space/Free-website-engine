import { NextRequest, NextResponse } from 'next/server';
import { publishMockConfig } from '@/engine/mock-publishing';

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === 'production' || process.env.STOREFRONT_MODE === 'api') return NextResponse.json({ error: 'Demo publishing is development only' }, { status: 403 });
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  let originUrl: URL;
  try { originUrl = new URL(origin || ''); }
  catch { return NextResponse.json({ error: 'Invalid origin' }, { status: 403 }); }
  if (originUrl.host !== host || !['http:', 'https:'].includes(originUrl.protocol)) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }
  const body = await request.text();
  if (body.length > 20000) return NextResponse.json({ error: 'Configuration is too large' }, { status: 413 });
  try {
    const value = JSON.parse(body) as { storeId?: unknown; config?: unknown };
    if (typeof value.storeId !== 'string') throw new Error('Invalid store ID');
    const snapshot = publishMockConfig(value.storeId, value.config);
    return NextResponse.json({ version: snapshot.config.publishedVersion });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid configuration' }, { status: 400 });
  }
}

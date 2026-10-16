import Image, { type ImageProps } from 'next/image';

type Props = Omit<ImageProps, 'src' | 'unoptimized'> & { src: string };

export function StoreImage({ src, ...props }: Props) {
  // Demo media is optimized by Next.js. Merchant media from a future backend
  // can still render until the platform provides an approved image proxy.
  const optimized = new URL(src).hostname === 'images.unsplash.com';
  return <Image {...props} src={src} unoptimized={!optimized} />;
}

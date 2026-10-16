import Image, { type ImageProps } from 'next/image';

type Props = Omit<ImageProps, 'src' | 'unoptimized'> & { src: string };

export function StoreImage({ src, ...props }: Props) {
  // Demo URLs already request a bounded image size. Serving them directly
  // avoids a server-side fetch dependency in the local storefront preview.
  return <Image {...props} src={src} unoptimized />;
}

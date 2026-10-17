import Image, { type ImageProps } from 'next/image';

type Props = Omit<ImageProps, 'src' | 'unoptimized'> & { src: string };

export function StoreImage({ src, ...props }: Props) {
  // Remote demo URLs already request a bounded size. Local campaign media can
  // use Next's optimizer without introducing a server-side network fetch.
  return <Image {...props} src={src} unoptimized={src.startsWith('https://')} />;
}

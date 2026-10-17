import { notFound } from 'next/navigation';
import { conceptById, type ConceptId } from '@/prototypes/data';
import { PrototypeApp } from '@/prototypes/PrototypeApp';
import '@/prototypes/prototype.css';

type Props = { params: Promise<{ variant: string }> };

export async function generateMetadata({ params }: Props) {
  const { variant } = await params;
  const concept = conceptById[variant as ConceptId];
  return { title: concept ? `${concept.name} | ${concept.storeName} Prototype` : 'Prototype', robots: { index: false, follow: false } };
}

export default async function PrototypeVariantPage({ params }: Props) {
  const { variant } = await params;
  const concept = conceptById[variant as ConceptId];
  if (!concept) notFound();
  return <PrototypeApp concept={concept} />;
}

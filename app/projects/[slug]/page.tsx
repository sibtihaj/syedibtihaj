import { Container } from "@/components/Container";
import { SingleProduct } from "@/components/Product";
import { products } from "@/constants/products";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.filter((p) => p.slug).map((p) => ({ slug: p.slug as string }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (product) {
    return {
      title: product.title,
      description: product.description,
    };
  }
  return {
    title: "Projects",
    description: "Projects and case studies by Syed Ibtihaj.",
  };
}

export default async function SingleProjectPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    redirect("/projects");
  }
  return (
    <Container>
      <SingleProduct product={product} />
    </Container>
  );
}

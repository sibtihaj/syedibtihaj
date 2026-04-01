import { Container } from "@/components/Container";
import { ProjectDetailToolbar } from "@/components/ProjectDetailToolbar";
import { SingleProduct } from "@/components/Product";
import { products } from "@/constants/products";
import type { Product } from "@/types/products";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug) as Product | undefined;
  if (product) {
    return {
      title: product.title,
      description: product.description,
    };
  }
  return {
    title: "Projects | Syed Ibtihaj",
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
      <ProjectDetailToolbar projectTitle={product.title} />
      <SingleProduct product={product} />
    </Container>
  );
}

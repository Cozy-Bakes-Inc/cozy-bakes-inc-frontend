import Product from "@/components/main/product";
import type { Metadata } from "next";
import { singleProductAPI } from "@/services/queries/products";
import { DEFAULT_OG_IMAGE } from "@/constants/seo";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await singleProductAPI(slug);
    const product = response.data;

    if (!product) {
      return { title: "Product" };
    }

    const description =
      product.description ??
      `${product.title} — handcrafted by Cozy Bakes Inc.`;
    const image = product.image ?? DEFAULT_OG_IMAGE;

    return {
      title: product.title,
      description,
      alternates: { canonical: `/products/${slug}` },
      openGraph: {
        title: product.title,
        description,
        images: [{ url: image }],
      },
    };
  } catch {
    return { title: "Product" };
  }
}

export default async function ProductPage() {
  return (
    <>
      <Product />
    </>
  );
}

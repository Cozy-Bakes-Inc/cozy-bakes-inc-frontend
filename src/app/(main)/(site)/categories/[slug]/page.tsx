import Category from "@/components/main/categories/details";
import type { Metadata } from "next";
import { getCategorySubcategoriesAPI } from "@/services/queries/categories";
import { DEFAULT_OG_IMAGE } from "@/constants/seo";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await getCategorySubcategoriesAPI(slug, 1);
    const category = response.data.category;

    if (!category) {
      return { title: "Category" };
    }

    const description =
      category.description ??
      `Browse ${category.title} from Cozy Bakes Inc.`;
    const image = category.image ?? DEFAULT_OG_IMAGE;

    return {
      title: category.title,
      description,
      alternates: { canonical: `/categories/${slug}` },
      openGraph: {
        title: category.title,
        description,
        images: [{ url: image }],
      },
    };
  } catch {
    return { title: "Category" };
  }
}

export default function CategoryPage() {
  return (
    <>
      <Category />
    </>
  );
}

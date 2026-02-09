import Category from "@/components/main/categories/details";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  console.log(slug);
  return (
    <>
      <Category />
    </>
  );
}

import type { MetadataRoute } from "next";
import type { PaginationMeta } from "@/interfaces/pagination";
import { SITE_URL } from "@/constants/seo";
import { listProductsInfiniteAPI } from "@/services/queries/products";
import { listCategoriesAPI } from "@/services/queries/categories";

async function fetchAllPages<TItem>(
  fetchPage: (page: number) => Promise<{ data: PaginationMeta<TItem> }>,
): Promise<TItem[]> {
  const items: TItem[] = [];
  let page = 1;
  let lastPage = 1;

  do {
    const response = await fetchPage(page);
    items.push(...response.data.data);
    lastPage = response.data.last_page;
    page += 1;
  } while (page <= lastPage);

  return items;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/menu",
    "/categories",
    "/story",
    "/contact",
    "/farmers-market",
    "/testimonials",
    "/privacy-policy",
    "/terms-of-service",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const [productsResult, categoriesResult] = await Promise.allSettled([
    fetchAllPages((page) => listProductsInfiniteAPI("latest", page)),
    fetchAllPages((page) => listCategoriesAPI(page)),
  ]);

  const productEntries: MetadataRoute.Sitemap =
    productsResult.status === "fulfilled"
      ? productsResult.value
          .filter((product) => product.slug)
          .map((product) => ({
            url: `${SITE_URL}/products/${product.slug}`,
            lastModified: product.updated_at
              ? new Date(product.updated_at)
              : new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
          }))
      : [];

  const categoryEntries: MetadataRoute.Sitemap =
    categoriesResult.status === "fulfilled"
      ? categoriesResult.value.map((category) => ({
          url: `${SITE_URL}/categories/${category.slug}`,
          lastModified: category.updated_at
            ? new Date(category.updated_at)
            : new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
        }))
      : [];

  return [...staticEntries, ...productEntries, ...categoryEntries];
}

import { PaginationMeta } from "../pagination";

export interface SubcategoryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  parent_category: string;
  products_count: string;
  slug: string;
  created_at: string;
}

export interface ApiCategoryItem {
  slug: string;
  title: string;
  description: string;
  status: number;
  image: string;
  product_count: number;
  created_at: string;
  updated_at: string;
}

export interface CategorySubcategoryItem {
  id: number;
  slug: string;
  category_id: number;
  title: string;
  description: string;
  image: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiProductItem {
  id: number | string;
  slug?: string;
  title: string;
  description?: string | null;
  image?: string;
  images?: Array<string>;
  price?: number | string | null;
  final_price?: number | string | null;
  discount_percentage?: number;
  description_ingredient?: string | null;
  freshness_guarantee?: string | null;
  nutritional_information?: string | null;
  premium_ingredient?: string[];
  quantity?: number | string | null;
  status?: number | string;
  total_sold?: number;
  sub_categories?: unknown[];
  created_at?: string;
  updated_at?: string;
}

export interface CategoryCardItem {
  id: string | number;
  image: string;
  title: string;
  subtitle: string;
  desc: string;
  href?: string;
  eyebrow?: string;
  footerLabel?: string;
}

export interface CategoriesApiResponse {
  status: string;
  message: string;
  data: PaginationMeta<ApiCategoryItem>;
}

export interface CategorySubcategoriesApiResponse {
  status: string;
  data: {
    category: {
      id: number;
      slug: string;
      title: string;
      description: string;
      image: string;
      created_at: string;
      sub_categories: PaginationMeta<CategorySubcategoryItem>;
    };
  };
}

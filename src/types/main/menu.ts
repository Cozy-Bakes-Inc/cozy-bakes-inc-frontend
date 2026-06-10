interface Menu {
  id: number;
  title: string;
  description: string;
  pdf_file_link: string;
  slug: string;
  is_active: string;
  shop_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface MenuResponse {
  status: string;
  data: Menu;
}

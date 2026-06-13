export interface UpcomingMarket {
  id: number;
  slug: string;
  market_name: string;
  tag_label: string;
  date: string;
  end_date: string;
  day: string[];
  time: string;
  end_time: string;
  location_address: string;
  description: string;
  map_link: string;
  cover_images: string[];
  created_at: string;
  updated_at: string;
}

export interface UpcomingMarketsResponse {
  status: string;
  total_markets: number;
  data: UpcomingMarket[];
}

export interface ListMarketResponse {
  status: string;
  total_markets: number;
  data: Record<string, UpcomingMarket[]>;
}

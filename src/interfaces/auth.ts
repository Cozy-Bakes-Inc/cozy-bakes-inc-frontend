export interface AuthenticatedUser {
  slug: string;
  first_name: string;
  last_name: string;
  email: string;
  is_verified: number;
  last_fulfillment_type?: string | null;
  profile: {
    phone_number: string;
    address: string;
  };
  receiver?: {
    first_name?: string | null;
    last_name?: string | null;
    phone_number?: string | null;
  } | null;
  shipping?: {
    address_line?: string | null;
    apt_villa?: string | null;
    building_cluster?: string | null;
    latitude?: string | null;
    longitude?: string | null;
    street_landmark?: string | null;
  } | null;
}

export interface AuthenticatedUserResponse {
  status: string;
  data: {
    user: AuthenticatedUser;
  };
}

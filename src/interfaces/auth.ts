export interface AuthenticatedUser {
  slug: string;
  first_name: string;
  last_name: string;
  email: string;
  is_verified: number;
  profile: {
    phone_number: string;
    address: string;
  };
}

export interface AuthenticatedUserResponse {
  status: string;
  data: {
    user: AuthenticatedUser;
  };
}

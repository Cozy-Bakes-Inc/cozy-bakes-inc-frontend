export interface ContactHeroSection {
  hero_title: string | null;
  hero_subtitle: string | null;
  cover_image: string | null;
}

export interface ContactSection {
  contact_email: string | null;
  phone_number: string | null;
  location: string | null;
  image: string | null;
}

export interface ContactDetails {
  hero_section: ContactHeroSection;
  contact_section: ContactSection;
}

export interface ContactDetailsResponse {
  status: string;
  message: string;
  data: ContactDetails;
}

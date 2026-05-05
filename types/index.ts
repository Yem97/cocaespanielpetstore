export type PetBreed = 'maine_coon' | 'cocker_spaniel';
export type PetGender = 'male' | 'female';
export type PetStatus = 'available' | 'reserved' | 'sold';

export interface Pet {
  id: string;
  name: string;
  breed: PetBreed;
  age_weeks: number;
  gender: PetGender;
  color: string;
  price_usd: number;
  status: PetStatus;
  description: string | null;
  image_url: string | null;
  is_featured: boolean;
  created_at: string;
}

export interface Inquiry {
  id?: string;
  full_name: string;
  country: string;
  email: string;
  whatsapp: string;
  breed_interest: string;
  pet_name?: string | null;
  message?: string | null;
  is_read?: boolean;
  created_at?: string;
}

export interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  like_count?: number;
}

export interface AdminStats {
  totalPets: number;
  availableCount: number;
  reservedCount: number;
  totalInquiries: number;
  unreadInquiries: number;
}

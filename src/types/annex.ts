// Matches the actual API response shape from the backend Sequelize models
export interface AnnexImage {
  id: string;
  imageUrl: string;
  annexId: string;
}

export interface AnnexFeature {
  id: string;
  featureName: string;
  annexId: string;
}

export interface AnnexOwner {
  name: string;
  email?: string;
  phone?: string;
  profile_pic?: string;
}

export interface AnnexUniversity {
  name: string;
  latitude?: string;
  longitude?: string;
}

export interface Annex {
  id: string;
  title: string;
  price: string | number;         // MySQL DECIMAL comes back as string
  address: string;
  description: string;
  beds?: number;
  bath?: string;
  latitude?: string | number;
  longitude?: string | number;
  distanceToUni?: string | number;
  status?: 'Pending' | 'Approved' | 'Rejected';
  universityId?: number | null;
  images: AnnexImage[];           // Array of image objects from AnnexImage table
  features: AnnexFeature[];       // Array of feature objects from AnnexFeature table
  owner?: AnnexOwner;
  university?: AnnexUniversity;
  // Legacy/fallback fields kept for backward compatibility
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  link?: string;
  rating?: string;
  campus?: string;
}

// types/seller.ts
export interface Seller {
  id: string;
  name: string;
  businessName: string;
  profession: string;
  description: string;
  avatar: string;
  coverImage: string;
  rating: number;
  reviews: number;
  completedOrders: number;
  responseRate: number;
  responseTime: string;
  location: string;
  joinedDate: string;
  email: string;
  phone: string;
  website: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  verificationStatus: 'verified' | 'pending' | 'unverified';
  categories: string[];
  skills: string[];
  followers: number;
  following: number;
  bio?: string;
  specialties?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  delivery: string;
  seller: Seller;
  reviews: Review[];
  imageUrl: string;
  category: string;
  whatsappNumber: string;
  portfolioImages: string[];
  features: string[];
  requirements: string[];
  tags: string[];
}

export interface Review {
  id: string;
  text: string;
  rating: number;
  user: string;
  date: string;
  verified: boolean;
  avatar?: string;
  service?: string;
}
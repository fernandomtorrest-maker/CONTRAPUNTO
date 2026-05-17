// Tipos globales de la plataforma Constructora Contrapunto

export interface QuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  comuna: string;
  projectType: string;
  budget: string;
  description: string;
  files?: File[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  avatarInitials: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface QuoteApiResponse {
  quoteId: string;
  uploadUrls: PresignedUploadUrl[];
  message: string;
}

export interface PresignedUploadUrl {
  filename: string;
  uploadUrl: string;
  publicUrl: string;
  expiresIn: number;
}

export interface NavLink {
  label: string;
  href: string;
}

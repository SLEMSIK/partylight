export type Category = 'light' | 'sound' | 'screens' | 'live-streams' | 'kits' | 'iron';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  shortDescription: string;
  longDescription: string;
  images: string[];
  featured?: boolean;
}

export interface ApplicationFormData {
  name: string;
  phone: string;
  vk?: string;
  telegram?: string;
  whatsapp?: string;
  comment?: string;
}

export interface ApplicationResponse {
  success: boolean;
  message: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  'light': 'Свет',
  'sound': 'Звук',
  'screens': 'Экраны',
  'live-streams': 'Прямые трансляции',
  'kits': 'Комплекты',
  'iron': 'Конструкционные решения'
};

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
  powerConsumption?: number; // Энергопотребление в ваттах (Вт)
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

export interface SmeethItem {
  category: 'sound' | 'light' | 'screens' | 'live-streams';
  productId: string;
  productName?: string; // Полное наименование продукта (заполняется при отправке)
  unitPrice?: number; // Цена за одну штуку (заполняется при отправке)
  quantity?: number;
  total?: number; // Стоимость позиции (цена * количество)
}

export interface WorkItem {
  type: 'mounting' | 'technician' | 'delivery';
  label?: 'Монтажники' | 'Техники' | 'Доставка';
  price: number; // Цена за одну штуку (unitPrice)
  quantity: number;
  total?: number; // Стоимость позиции (цена * количество)
}

export interface OtherItem {
  name: string;
  price: number; // Цена за одну штуку (unitPrice)
  quantity: number;
  total?: number; // Стоимость позиции (цена * количество)
}

export interface SmeethFormData {
  items: SmeethItem[];
  workItems?: WorkItem[];
  otherItems?: OtherItem[];
  subtotal: number; // Сумма без скидки и налога
  discountPercent: number; // Скидка в процентах
  taxPercent: number; // Налог в процентах (увеличивает сумму)
  totalAmount: number; // Итоговая стоимость сметы с учетом скидки и налога
  comment?: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  'light': 'Свет',
  'sound': 'Звук',
  'screens': 'Экраны',
  'live-streams': 'Прямые трансляции',
  'kits': 'Комплекты',
  'iron': 'Конструкционные решения'
};

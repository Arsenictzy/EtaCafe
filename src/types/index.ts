export type Role = 'pelanggan' | 'kasir' | 'dapur' | 'manajer';

export type OrderStatus =
  | 'Menunggu Konfirmasi Kasir'
  | 'Dikonfirmasi'
  | 'Sedang Diproses'
  | 'Selesai'
  | 'Dibatalkan';

export type OrderType = 'langsung' | 'qr_meja';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  isAvailable: boolean;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  menuItemName: string;
  price: number;
  quantity: number;
  notes?: string;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  orderType: OrderType;
  tableNumber?: string | null;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  promoCode?: string | null;
  taxAmount: number; // 10%
  serviceFee: number; // 5%
  totalAmount: number;
  paymentMethod: 'QRIS' | 'Kartu Debit/Kredit' | 'Tunai';
  paymentStatus: 'Berhasil (Simulasi)';
  status: OrderStatus;
  createdAt: string;
  confirmedAt?: string | null;
  processingAt?: string | null;
  completedAt?: string | null;
  cancelledAt?: string | null;
}

export interface User {
  id: string;
  name: string;
  emailOrPhone: string;
  role: Role;
  createdAt: string;
}

export interface Promo {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 10 (%) or 20000 (Rp)
  minOrder: number;
  isActive: boolean;
}

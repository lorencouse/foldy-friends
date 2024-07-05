export interface UserData {
  id: string;
  email: string | null; 
  created_at: Date;
  shipping_info: AddressInfo;
  billing_info: AddressInfo;
  photo_url: string;
  order_history: CustomerOrder[];
  username: string;
}
export interface AddressInfo {
  name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email: string;
  phone: string;
}

export interface ProductData {
  id: string;
  name: string;
  description: string;
  full_price: number;
  sale_price?: number;
  images: string[];
  variations: string[];
  category: string;
  tags: string[];
  reviews: ProductReview[];
  created_at: Date;
  updated_at: Date;
  sold_to_date: number;
  stock: number;
  sku: string;
}

export interface ProductVariation {
  product_id: string;
  variation?: string;
  quantity: number;
}
export interface ProductReview {
  id: string;
  created_at: Date;
  product_id: string;
  user_id: string;
  title: string;
  content: string;
  rating: number;
}

export interface CartItem {
  key: string;
  id: string;
  quantity: number;
  variation?: string;
}

export interface CustomerOrder {
  id: string;
  created_at: Date;
  customer_id: string;
  shipping_info: AddressInfo;
  billing_info: AddressInfo;
  products: ProductVariation[];
}

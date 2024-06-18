export interface ProductData {
  id: number;
  name: string;
  category: string;
  new_price?: number;
  old_price: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  size: string;
}

export interface ProductAttributes {
  [atribute: string]: string[];
}

export interface ProductInfo {
  id: string;
  name: string;
  description: string;
  full_price: number;
  sale_price: number;
  images: string[];
  sizes: string[];
  categories: string[];
  tags: string[];
  reviews: ProductReview[];
  created_at: Date;
  updated_at: Date;
  sold_to_date: number;
  stock: number;
  sku: string;
}

export interface ProductVariation {
  product_id: number;
  size: string;
  quantity: number;
}
export interface ProductReview {
  product_id: number;
  created_at: Date;
  product_id: number;
  user_id: number;
  title: string;
  content: string;
  rating: number;
}

export interface ReviewData {
  id: number;
  title: string;
  content: string;
  rating: number;
}

export interface UserProfile {
  id: string;
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
}

export interface CustomerOrder {
  id: number;
  created_at: Date;
  customer_id: number;
  shipping_info: AddressInfo;
  billing_info: AddressInfo;
  products: ProductVariation[];
}

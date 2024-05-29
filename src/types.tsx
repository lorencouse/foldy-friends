export interface ProductData {
    id: number;
    name: string;
    category: string;
    image: string;
    new_price: number;
    old_price: number;
}

export interface CartItem {
    id: number;
    quantity: number;
    size: string;
}

export interface LinkInfo {
    title: string, 
    url: string
}
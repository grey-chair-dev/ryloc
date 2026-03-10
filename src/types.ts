export interface Part {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  image_url: string;
  car_models: string;
  ebay_url?: string;
  core_charge: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface CartItem extends Part {
  quantity: number;
}

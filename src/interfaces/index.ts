export interface IMeal {
  id: number;
  userId?: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  img: string;
  description: string;
  ingredients: string[];
  allergens: string[];
  weight: string;
  price: number;
}

import { Product } from "./product";

export type ApiResponse = {
  body: {
    products: Product[];
    product_id: number;
    name: string;
    price: number;
    category: string;
    sizes: string;
    msg: string;
    product: Product;
  };
};

import axios from "axios";

import { config } from "./config";
import { Category, Product } from "./types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const categories: Category[] = [
  { id: "men's clothing", name: "men's clothing" },
  { id: "jewelery", name: "jewelery" },
  { id: "electronics", name: "electronics" },
  { id: "women's clothing", name: "women's clothing" },
]

export const fetchProducts = async ({
  page,
  limit,
  category
}: {
  page: number,
  limit: number,
  category: string
}) => {
    let url = `${config.apiPath}/products`;

    const { data: products } = await axios.get(url);

    let filteredProducts = products;
    if (category) {
      filteredProducts = products.filter((product: Product) => product.category === category);
    }
  
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      totalPages: Math.ceil(filteredProducts.length / limit),
      totalItems: filteredProducts.length
    };
  };

  export async function getCategories(): Promise<Category[]> {
    await delay(300)
  
    return categories
  }

  export const fetchProduct = async (id: string): Promise<Product> => {
    let url = `${config.apiPath}/products/${id}`;

    const { data } = await axios.get(url);
    return data;
  };

  export const fetchRelatedProducts = async (category: string, productId: number): Promise<Product[]> => {
    let url = `${config.apiPath}/products/`;

    const { data } = await axios.get(url);

    const products = data.filter((product: Product) => product.category === category && product.id !== productId);
    return products.slice(0, 4);
  }

  export const fetchFeaturedProducts = async (): Promise<Product[]> => {
    let url = `${config.apiPath}/products/`;

    const { data } = await axios.get(url);

    const products = data.filter((product: Product) => product.rating.rate >= 4.0);
    return products;
  }

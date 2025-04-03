import axios from "axios";

import { config } from "./config";
import { Category, Order, Product } from "./types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const categories: Category[] = [
  { id: "men's clothing", name: "men's clothing" },
  { id: "jewelery", name: "jewelery" },
  { id: "electronics", name: "electronics" },
  { id: "women's clothing", name: "women's clothing" },
]

const orders: Order[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `order-${i + 1}`,
  date: new Date(Date.now() - i * 86400000 * 7).toISOString(),
  status: ["Entregado", "En camino", "Procesando", "Cancelado"][Math.floor(Math.random() * 4)],
  total: Math.floor(Math.random() * 200) + 50,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  items: Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, j) => ({
    id: `product-${Math.floor(Math.random() * 20) + 1}`,
    title: `Producto ${Math.floor(Math.random() * 20) + 1}`,
    price: Math.floor(Math.random() * 100) + 20,
    image: `/placeholder.svg?height=400&width=400&text=Producto+${Math.floor(Math.random() * 20) + 1}`,
    quantity: Math.floor(Math.random() * 3) + 1,
  })),
}))

export const fetchAllProducts = async (): Promise<Product[]> => {
  let url = `${config.apiPath}/products`;
  const { data: products } = await axios.get(url);
  return products
}

export const fetchProducts = async ({
  page,
  limit,
  category
}: {
  page: number,
  limit: number,
  category?: string
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

  export async function getUserOrders(): Promise<Order[]> {
    await delay(600)
  
    return orders
  }
  
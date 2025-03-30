import axios from "axios";

import { Category } from "./types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const categories: Category[] = [
  { id: "men's clothing", name: "men's clothing" },
  { id: "jewelery", name: "jewelery" },
  { id: "electronics", name: "electronics" },
  { id: "women's clothing", name: "women's clothing" },
]

export const fetchProducts = async () => {
    let url = "https://fakestoreapi.com/products";

    const { data } = await axios.get(url);
    return data;
  };

  export async function getCategories(): Promise<Category[]> {
    await delay(300)
  
    return categories
  }
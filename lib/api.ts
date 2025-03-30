import axios from "axios";

export const fetchProducts = async () => {
    let url = "https://fakestoreapi.com/products";

    const { data } = await axios.get(url);
    return data;
  };
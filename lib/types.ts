export interface Product {
    id: number
    title: string
    price: number
    description: string
    image: string
    category: string
    rating: {
        rate: number,
        count: number
    }
  }

  export interface Category {
    id: string
    name: string
  }

  export interface User {
    id: string
    name: string
    email: string
  }
  
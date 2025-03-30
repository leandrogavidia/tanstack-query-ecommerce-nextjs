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
  
export interface CartItem {
  id: string
  title: string
  price: number
  image: string
  quantity: number
}
  export interface Order {
    id: string
    date: string
    status: string
    total: number
    items: CartItem[]
  }
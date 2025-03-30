/* eslint-disable no-unused-vars */
"use client"


import { createContext, useContext, useEffect, useState } from "react"

import { useToast } from "@/hooks/use-toast"

import type React from "react"

export type CartItem = {
    id: number
    title: string
    price: number
    image: string
    quantity: number
}

type CartContextType = {
    items: CartItem[]
    addItem: (item: Omit<CartItem, "quantity">) => void
    updateQuantity: (id: number, quantity: number) => void
    removeItem: (id: number) => void
    clearCart: () => void
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    totalItems: number
    subtotal: number
    tax: number
    total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart from localStorage:", e)
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items))
    }, [items])

    const addItem = (newItem: Omit<CartItem, "quantity">) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === newItem.id)

            if (existingItem) {
                return prevItems.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item))
            } else {
                return [...prevItems, { ...newItem, quantity: 1 }]
            }
        })

        setIsOpen(true)
        toast({
            title: "Producto añadido",
            description: `${newItem.title} ha sido añadido al carrito`,
        })
    }

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return

        setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }

    const removeItem = (id: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    }

    const clearCart = () => {
        setItems([])
    }

    const totalItems = items.reduce((total, item) => total + item.quantity, 0)
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
    const tax = subtotal * 0.16
    const total = subtotal + tax

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                updateQuantity,
                removeItem,
                clearCart,
                isOpen,
                setIsOpen,
                totalItems,
                subtotal,
                tax,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}


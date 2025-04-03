/* eslint-disable no-unused-vars */
"use client"


import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

import { useToast } from "@/hooks/use-toast"

import { useAuth } from "./use-auth"

import type { Product } from "@/lib/types"
import type React from "react"

interface FavoritesContextType {
    favorites: Product[]
    toggleFavorite: (product: Product) => void
    isFavorite: (productId: number) => boolean
    clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<Product[]>([])
    const { isAuthenticated } = useAuth()
    const { push } = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favoritos")
        if (storedFavorites) {
            try {
                setFavorites(JSON.parse(storedFavorites))
            } catch (e) {
                console.error("Failed to parse favorites from localStorage:", e)
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favorites))
    }, [favorites])

    const toggleFavorite = (product: Product) => {
        if (!isAuthenticated) {
            push("/login?redirect=/mi-cuenta?tab=favoritos")
            return
        }
        setFavorites((prevFavorites) => {
            const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === product.id)

            if (isAlreadyFavorite) {
                toast({
                    title: "Eliminado de favoritos",
                    description: `${product.title} ha sido eliminado de tus favoritos`,
                })
                return prevFavorites.filter((fav) => fav.id !== product.id)
            } else {
                toast({
                    title: "Añadido a favoritos",
                    description: `${product.title} ha sido añadido a tus favoritos`,
                })
                return [...prevFavorites, product]
            }
        })
    }

    const isFavorite = (productId: number) => {
        if (!isAuthenticated) return false;
        return favorites.some((fav) => fav.id === Number(productId))
    }

    const clearFavorites = () => {
        setFavorites([])
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                toggleFavorite,
                isFavorite,
                clearFavorites,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    const context = useContext(FavoritesContext)
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider")
    }
    return context
}


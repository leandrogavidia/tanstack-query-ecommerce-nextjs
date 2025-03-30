"use client"

import Link from "next/link"

import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/types"

import { useFavorites } from "./providers/favorites-provider"


export default function FavoriteProducts() {
    const { favorites, clearFavorites } = useFavorites()

    if (favorites.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No tienes favoritos</h3>
                <p className="text-muted-foreground mb-4">Aún no has añadido ningún producto a tus favoritos.</p>
                <Button asChild>
                    <Link href="/productos">Explorar productos</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Mis productos favoritos</h2>
                <Button variant="outline" size="sm" onClick={clearFavorites}>
                    Limpiar favoritos
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}


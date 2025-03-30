"use client"

import { Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatCurrencyMXN } from "@/lib/utils"

import { useCart } from "./providers/cart-provider"
import { useFavorites } from "./providers/favorites-provider"

import type { Product } from "@/lib/types"

export default function ProductCard({ product }: { product: Product }) {
    const [isLoading, setIsLoading] = useState(true)
    const { addItem } = useCart()
    const { toggleFavorite, isFavorite } = useFavorites()
    const isFav = isFavorite(product.id)

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
        })
    }
    return (
        <Card className="overflow-hidden group">
            <div className="relative aspect-square overflow-hidden">
                <Link href={`/productos/${product.id}`}>
                    <div className="relative h-full w-full">
                        <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            fill
                            className={`object-cover transition-all duration-300 group-hover:scale-105 ${isLoading ? "blur-sm" : "blur-0"
                                }`}
                            onLoad={() => setIsLoading(false)}
                        />
                    </div>
                </Link>

                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-70 hover:opacity-100"
                    onClick={() => toggleFavorite(product)}
                >
                    <Heart className={`h-4 w-4 ${isFav ? "fill-destructive text-destructive" : ""}`} />
                    <span className="sr-only">Añadir a favoritos</span>
                </Button>

                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-full items-center justify-center">
                        <Button variant="secondary" size="sm" className="h-8" onClick={handleAddToCart} >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Añadir al carrito
                        </Button>
                    </div>
                </div>
            </div>

            <CardContent className="p-4">
                <div className="space-y-1">
                    <h3 className="font-medium leading-tight">
                        <Link href={`/productos/${product.id}`} className="hover:underline">
                            {product.title}
                        </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="font-bold">{formatCurrencyMXN(product.price)}</div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href={`/productos/${product.id}`}>Ver detalles</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}


"use client"

import { useMutation } from "@tanstack/react-query"
import { ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrencyMXN } from "@/lib/utils"

import { useCart } from "./providers/cart-provider"

import type { Product } from "@/lib/types"


export default function ProductDetail({ product }: { product: Product }) {
    const [selectedSize, setSelectedSize] = useState("m")
    const { addItem } = useCart()

    const addToCartMutation = useMutation({
        mutationFn: () => {
            return new Promise<void>((resolve) => setTimeout(resolve, 500))
        },
        onSuccess: () => {
            addItem({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
            })
        },
    })

    const handleAddToCart = () => {
        addToCartMutation.mutate()
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-lg border bg-white">
                    <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-contain" priority />
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <div className="mt-2 flex items-center">
                        <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-5 w-5 ${i < (product.rating.rate || 4) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="ml-2 text-sm text-muted-foreground">{product.rating.count || 42} reseñas</span>
                    </div>
                </div>

                <div className="text-3xl font-bold">{formatCurrencyMXN(product.price)}</div>

                <p className="text-muted-foreground">{product.description}</p>

                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-sm font-medium">Talla</span>
                        <span className="text-sm text-muted-foreground">Guía de tallas</span>
                    </div>
                    <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="grid grid-cols-5 gap-2">
                        {["xs", "s", "m", "l", "xl"].map((size) => (
                            <div key={size}>
                                <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                                <Label
                                    htmlFor={`size-${size}`}
                                    className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border text-sm uppercase peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                                >
                                    {size}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <div className="flex space-x-2">
                    <Button className="flex-1 text-white" onClick={handleAddToCart} disabled={addToCartMutation.isPending}>
                        {addToCartMutation.isPending ? (
                            <div className="flex items-center">
                                <div className="h-4 w-4 border-2 border-current border-t-transparent animate-spin rounded-full mr-2"></div>
                                Añadiendo...
                            </div>
                        ) : (
                            <>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Añadir al carrito
                            </>
                        )}
                    </Button>
                </div>

                <Tabs defaultValue="description" className="mt-8">
                    <TabsList className="w-full">
                        <TabsTrigger value="description" className="flex-1">
                            Descripción
                        </TabsTrigger>
                        <TabsTrigger value="details" className="flex-1">
                            Detalles
                        </TabsTrigger>
                        <TabsTrigger value="shipping" className="flex-1">
                            Envío
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="pt-4">
                        <div className="space-y-4">
                            <p>{product.description}</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                                nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
                                nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent value="details" className="pt-4">
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Material: Algodón 100%</li>
                            <li>Hecho en España</li>
                            <li>Lavado a máquina a 30°C</li>
                            <li>No usar lejía</li>
                            <li>Planchar a temperatura media</li>
                        </ul>
                    </TabsContent>
                    <TabsContent value="shipping" className="pt-4">
                        <div className="space-y-4">
                            <p>
                                Envío gratuito en pedidos superiores a 50€. Entrega en 24/48h en península. Consulta condiciones para
                                envíos a islas y extranjero.
                            </p>
                            <p>Devoluciones gratuitas en un plazo de 30 días desde la recepción del pedido.</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}


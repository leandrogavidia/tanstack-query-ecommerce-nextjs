"use client"

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { formatCurrencyMXN } from "@/lib/utils"

import { useCart } from "./providers/cart-provider"

export default function CartDrawer({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    // eslint-disable-next-line no-unused-vars
    setIsOpen: (open: boolean) => void
}) {
    const { items, updateQuantity, removeItem, clearCart, subtotal, tax, total } = useCart()

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader className="space-y-2 pr-6">
                    <SheetTitle className="flex items-center">
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Carrito de Compras
                    </SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4 px-4">
                        <div className="rounded-full bg-muted p-6">
                            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-medium">Tu carrito está vacío</h3>
                            <p className="text-muted-foreground mt-1">Parece que no has añadido ningún producto a tu carrito.</p>
                        </div>
                        <Button onClick={() => setIsOpen(false)} asChild>
                            <Link href="/productos">Explorar productos</Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-auto py-6 px-4">
                            <ul className="space-y-6">
                                {items.map((item) => (
                                    <li key={item.id} className="flex space-x-4">
                                        <div className="relative h-24 w-24 overflow-hidden rounded-md border">
                                            <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h4 className="text-sm font-medium leading-tight">{item.title}</h4>
                                            <p className="text-sm font-medium text-primary">{formatCurrencyMXN(item.price)}</p>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                    <span className="sr-only">Reducir cantidad</span>
                                                </Button>
                                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                    <span className="sr-only">Aumentar cantidad</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 ml-auto"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                    <span className="sr-only">Eliminar</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="border-t pt-6 px-4">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>{formatCurrencyMXN(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Impuestos (16%)</span>
                                    <span>{formatCurrencyMXN(tax)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>{formatCurrencyMXN(total)}</span>
                                </div>
                                <div className="space-y-2">
                                    <Button className="w-full">Proceder al pago</Button>
                                    <Button variant="outline" className="w-full" onClick={() => clearCart()}>
                                        Vaciar carrito
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}


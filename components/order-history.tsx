"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getUserOrders } from "@/lib/api"
import { Order } from "@/lib/types"
import { formatCurrencyMXN, formatDate } from "@/lib/utils"

export default function OrderHistory() {
    const {
        data: orders,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["orders"],
        queryFn: getUserOrders,
    })

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between">
                            <div className="space-y-2">
                                <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
                                <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                            </div>
                            <div className="h-6 w-20 bg-muted rounded animate-pulse"></div>
                        </div>
                        <div className="h-20 bg-muted rounded animate-pulse"></div>
                    </div>
                ))}
            </div>
        )
    }

    if (isError || !orders || orders.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No tienes pedidos</h3>
                <p className="text-muted-foreground mb-4">Aún no has realizado ningún pedido.</p>
                <Button asChild>
                    <Link href="/productos">Explorar productos</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Historial de pedidos</h2>

            <div className="space-y-4">
                {orders.map((order: Order) => (
                    <Accordion key={order.id} type="single" collapsible className="border rounded-lg">
                        <AccordionItem value="items" className="border-none">
                            <div className="p-4">
                                <div className="flex flex-col sm:flex-row justify-between gap-4">
                                    <div>
                                        <p className="font-medium">Pedido #{order.id}</p>
                                        <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge
                                            variant={
                                                order.status === "Entregado"
                                                    ? "default"
                                                    : order.status === "En camino"
                                                        ? "secondary"
                                                        : order.status === "Procesando"
                                                            ? "outline"
                                                            : "destructive"
                                            }
                                        >
                                            {order.status}
                                        </Badge>
                                        <p className="font-medium">{formatCurrencyMXN(order.total)}</p>
                                    </div>
                                </div>

                                <AccordionTrigger className="py-2">Ver detalles del pedido</AccordionTrigger>
                            </div>

                            <AccordionContent className="px-4 pb-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">Imagen</TableHead>
                                            <TableHead>Producto</TableHead>
                                            <TableHead className="text-right">Cantidad</TableHead>
                                            <TableHead className="text-right">Precio</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {order.items.map((item) => (
                                            <TableRow key={`${order.id}-${item.id}`}>
                                                <TableCell>
                                                    <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                                                        <Image
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">{item.title}</TableCell>
                                                <TableCell className="text-right">{item.quantity}</TableCell>
                                                <TableCell className="text-right">{formatCurrencyMXN(item.price)}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-right font-medium">
                                                Total
                                            </TableCell>
                                            <TableCell className="text-right font-bold">{formatCurrencyMXN(order.total)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                                <div className="mt-4 flex justify-end">
                                    <Button variant="outline" size="sm">
                                        Descargar factura
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </div>
    )
}


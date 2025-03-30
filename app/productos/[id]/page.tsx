"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { Suspense, useEffect } from "react"

import ProductDetail from "@/components/product-detail"
import ProductsLoading from "@/components/products-loading"
import RelatedProducts from "@/components/related-products"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchProduct } from "@/lib/api"


export default function ProductPage() {
    const params = useParams()
    const productId = params.id as string

    const {
        data: product,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => fetchProduct(productId),
    })

    useEffect(() => {
        if (product) {
            document.title = `${product.title} | NextStore`
        }
    }, [product])

    if (isLoading) {
        return <ProductPageSkeleton />
    }

    if (isError) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Error al cargar el producto</h1>
                <p className="text-muted-foreground mb-8">
                    {error instanceof Error ? error.message : "Ha ocurrido un error inesperado"}
                </p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Producto no encontrado</h1>
                <p className="text-muted-foreground mb-8">
                    Lo sentimos, el producto que estás buscando no existe o ha sido eliminado.
                </p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ProductDetail product={product} />

            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8">Productos relacionados</h2>
                <Suspense fallback={<ProductsLoading count={4} />}>
                    <RelatedProducts categoryId={product.category} productId={product.id} />
                </Suspense>
            </div>
        </div>
    )
}

function ProductPageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <div className="flex space-x-2 overflow-auto pb-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-20 w-20 rounded-md flex-shrink-0" />
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <div className="flex space-x-2">
                        <Skeleton className="h-12 flex-1" />
                        <Skeleton className="h-12 w-12" />
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <Skeleton className="h-8 w-64 mb-8" />
                <ProductsLoading count={4} />
            </div>
        </div>
    )
}


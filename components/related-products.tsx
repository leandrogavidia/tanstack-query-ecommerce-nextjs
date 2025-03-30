"use client"

import { useQuery } from "@tanstack/react-query"

import ProductCard from "@/components/product-card"
import ProductsLoading from "@/components/products-loading"
import { fetchRelatedProducts } from "@/lib/api"

export default function RelatedProducts({
    categoryId,
    productId,
}: {
    categoryId: string,
    productId: number
}) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["relatedProducts", categoryId],
        queryFn: () => fetchRelatedProducts(categoryId, productId),
    })

    if (isLoading) {
        return <ProductsLoading count={4} />
    }

    if (isError || !data || data.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No se encontraron productos relacionados</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}


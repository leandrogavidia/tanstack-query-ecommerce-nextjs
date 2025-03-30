"use client"

import { useQuery } from "@tanstack/react-query"

import ProductCard from "@/components/product-card"
import { fetchFeaturedProducts } from "@/lib/api"

export default function FeaturedProducts() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["featuredProducts"],
        queryFn: fetchFeaturedProducts,
    })

    if (isLoading) {
        return <div>Cargando productos destacados...</div>
    }

    if (isError || !data || data.length === 0) {
        return <div>No se pudieron cargar los productos destacados</div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}


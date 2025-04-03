"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { fetchProducts } from "@/lib/api"
import { Product } from "@/lib/types"

export default function ProductCatalog() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const category = searchParams.get('categoria') || ""
    const page = Number(searchParams.get('pagina')) || 1

    const limit = 8

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["fakeStoreProducts", { category, page, limit }],
        queryFn: () => fetchProducts({ category, page, limit }),
    })

    const products = data?.products || []
    const totalPages = data?.totalPages || 1

    const handlePageChange = (newPage: number) => {
        const searchParams = new URLSearchParams()
        if (category) searchParams.set("categoria", category)
        searchParams.set("pagina", newPage.toString())

        router.push(`${pathname}?${searchParams.toString()}`)
    }

    if (isLoading) {
        return <div>Cargando productos...</div>
    }

    if (isError) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Error al cargar los productos</h3>
                <p className="text-muted-foreground mb-4">
                    {error instanceof Error ? error.message : "Ha ocurrido un error inesperado"}
                </p>
                <Button onClick={() => router.refresh()}>Intentar de nuevo</Button>
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No se encontraron productos</h3>
                <p className="text-muted-foreground">
                    {category ? `No hay productos disponibles en la categoría seleccionada.` : `No hay productos disponibles.`}
                </p>
            </div>
        )
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {
                    category ? (
                        products.filter((product: Product) => product.category === category).map((product: Product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        products.map((product: Product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )
                }

            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                    <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                            Anterior
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <Button
                                key={pageNum}
                                variant={pageNum === page ? "default" : "outline"}
                                onClick={() => handlePageChange(pageNum)}
                            >
                                {pageNum}
                            </Button>
                        ))}

                        <Button variant="outline" onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
                            Siguiente
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}


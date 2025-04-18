import { Suspense } from "react"

import ProductCatalog from "@/components/product-catalog"
import ProductFilters from "@/components/product-filters"
import ProductsLoading from "@/components/products-loading"


export default async function ProductsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-64 shrink-0">
                    <Suspense fallback={<div>Cargando filtros...</div>}>
                        <ProductFilters />
                    </Suspense>
                </div>

                <div className="flex-1">
                    <Suspense fallback={<ProductsLoading count={8} />}>
                        <ProductCatalog />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}


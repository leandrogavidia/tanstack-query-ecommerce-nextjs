"use client"

import { useQuery } from "@tanstack/react-query"
import { Check, ChevronDown } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { getCategories } from "@/lib/api"


export default function ProductFilters() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const selectedCategory = searchParams.get('categoria') || ""

    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    })

    const handleCategoryChange = (category?: string) => {
        const searchParams = new URLSearchParams()
        if (category) searchParams.set("categoria", category)
        searchParams.set("pagina", "1") // Reset to page 1 when changing filters

        router.push(`${pathname}?${searchParams.toString()}`)
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium mb-4">Filtros</h3>
                <Collapsible className="md:hidden">
                    <CollapsibleTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            Mostrar filtros
                            <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-6 mt-4">
                        {/* Categories */}
                        <div>
                            <h4 className="font-medium mb-3">Categorías</h4>
                            {isLoading ? (
                                <div className="space-y-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className="h-8 bg-muted rounded animate-pulse"></div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Button
                                        variant="ghost"
                                        className={`w-full justify-start ${!selectedCategory ? "bg-muted" : ""}`}
                                        onClick={() => handleCategoryChange(undefined)}
                                    >
                                        <span className="mr-2">{!selectedCategory && <Check className="h-4 w-4" />}</span>
                                        Todas las categorías
                                    </Button>
                                    {categories?.map((category) => (
                                        <Button
                                            key={category.id}
                                            variant="ghost"
                                            className={`w-full justify-start ${selectedCategory === category.id ? "bg-muted" : ""}`}
                                            onClick={() => handleCategoryChange(category.id)}
                                        >
                                            <span className="mr-2">{selectedCategory === category.id && <Check className="h-4 w-4" />}</span>
                                            {category.name}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {/* Desktop filters - always visible */}
            <div className="hidden md:block space-y-6">
                {/* Categories */}
                <div>
                    <h4 className="font-medium mb-3">Categorías</h4>
                    {isLoading ? (
                        <div className="space-y-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-8 bg-muted rounded animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${!selectedCategory ? "bg-muted" : ""}`}
                                onClick={() => handleCategoryChange(undefined)}
                            >
                                <span className="mr-2">{!selectedCategory && <Check className="h-4 w-4" />}</span>
                                Todas las categorías
                            </Button>
                            {categories?.map((category) => (
                                <Button
                                    key={category.id}
                                    variant="ghost"
                                    className={`w-full justify-start ${selectedCategory === category.id ? "bg-muted" : ""}`}
                                    onClick={() => handleCategoryChange(category.id)}
                                >
                                    <span className="mr-2">{selectedCategory === category.id && <Check className="h-4 w-4" />}</span>
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


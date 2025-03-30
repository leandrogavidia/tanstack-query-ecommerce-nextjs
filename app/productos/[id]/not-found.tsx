import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">Producto no encontrado</h1>
            <p className="text-muted-foreground mb-8">
                Lo sentimos, el producto que estás buscando no existe o ha sido eliminado.
            </p>
            <Button asChild>
                <Link href="/productos">Volver al catálogo</Link>
            </Button>
        </div>
    )
}


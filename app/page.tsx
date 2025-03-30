import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative rounded-lg overflow-hidden mb-12">
        <div className="bg-gradient-to-r from-primary to-primary/70 p-8 md:p-16 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Descubre nuestra nueva colección</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Productos de alta calidad con diseños exclusivos para todos los estilos.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/productos" className="font-medium">
                Ver productos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}


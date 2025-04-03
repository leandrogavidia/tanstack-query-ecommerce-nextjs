import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

import ChatBot from "@/components/chat-bot"
import FeaturedProducts from "@/components/featured-products"
import ProductsLoading from "@/components/products-loading"
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

      <section className="mb-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">¿Necesitas ayuda?</h2>
          <p className="text-lg mb-6 text-muted-foreground">
            Nuestro asistente virtual está disponible 24/7 para responder tus preguntas sobre productos, envíos,
            devoluciones o cualquier otra consulta que tengas.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="font-bold">1</span>
              </div>
              <p>Pregunta sobre nuestros productos y servicios</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="font-bold">2</span>
              </div>
              <p>Obtén recomendaciones personalizadas</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="font-bold">3</span>
              </div>
              <p>Resuelve dudas sobre tu pedido</p>
            </div>
          </div>
        </div>

        <div className="h-[500px]">
          <ChatBot embedded={true} className="h-full" />
        </div>
      </section>

      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Productos destacados</h2>
          <Button asChild variant="outline">
            <Link href="/productos">Ver todos</Link>
          </Button>
        </div>
        <Suspense fallback={<ProductsLoading count={4} />}>
          <FeaturedProducts />
        </Suspense>
      </section>
    </div>
  )
}


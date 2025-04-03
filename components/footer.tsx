import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-muted py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">NextStore</h3>
                        <p className="text-muted-foreground">
                            Tu tienda online de confianza para encontrar los mejores productos al mejor precio.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Compras</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/productos" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Catálogo
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Ofertas
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Categorías
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Envíos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Empresa</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Sobre nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Trabaja con nosotros
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Términos y condiciones
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Política de privacidad
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Política de cookies
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                        © {new Date().getFullYear()} NextStore. Todos los derechos reservados.
                    </p>

                    <div className="flex space-x-4">
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Instagram className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}


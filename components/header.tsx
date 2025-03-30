"use client"

import { ShoppingCart, Menu, Search, Sun, Moon, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

import CartDrawer from "@/components/cart-drawer"
import MobileNav from "@/components/mobile-nav"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { useCart } from "./providers/cart-provider"

import type React from "react"


const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: "/productos" },
]

export default function Header() {
    const pathname = usePathname()
    const { setTheme, resolvedTheme } = useTheme()
    const { totalItems, isOpen, setIsOpen } = useCart()
    const [isScrolled, setIsScrolled] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Search for:", searchQuery)
    }

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    return (
        <>
            <header
                className={`sticky top-0 z-40 w-full transition-all duration-200 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-primary">NextStore</span>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href ? "text-primary" : "text-muted-foreground"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center space-x-4">
                            <form onSubmit={handleSearch} className="hidden md:flex relative">
                                <Input
                                    type="search"
                                    placeholder="Buscar productos..."
                                    className="w-[200px] lg:w-[300px]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0">
                                    <Search className="h-4 w-4" />
                                    <span className="sr-only">Buscar</span>
                                </Button>
                            </form>

                            {mounted && (
                                <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Cambiar tema">
                                    {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                    <span className="sr-only">Cambiar tema</span>
                                </Button>
                            )}

                            <Button variant="ghost" size="icon" asChild>
                                <Link href="/mi-cuenta?tab=favorites">
                                    <Heart className="h-5 w-5" />
                                    <span className="sr-only">Favoritos</span>
                                </Link>
                            </Button>

                            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)}>
                                <ShoppingCart className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                                    >
                                        {totalItems}
                                    </Badge>
                                )}
                                <span className="sr-only">Carrito</span>
                            </Button>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="md:hidden">
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">Menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                                    <MobileNav />
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </header>

            <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}


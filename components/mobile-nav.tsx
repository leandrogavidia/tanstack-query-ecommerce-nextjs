"use client"


import { Search, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"


import type React from "react"

const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: "/productos" },
    { label: "Categorías", href: "/categorias" },
    { label: "Ofertas", href: "/ofertas" },
]

export default function MobileNav() {
    const pathname = usePathname()
    const { setTheme, resolvedTheme } = useTheme()
    const [searchQuery, setSearchQuery] = useState("")
    const [mounted, setMounted] = useState(false)

    // After mounting, we can safely show the theme toggle
    useEffect(() => {
        setMounted(true)
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Implement search functionality
        console.log("Search for:", searchQuery)
    }

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold">NextStore</span>
                </Link>

                {/* Theme Toggle for Mobile */}
                {mounted && (
                    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Cambiar tema">
                        {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        <span className="sr-only">Cambiar tema</span>
                    </Button>
                )}
            </div>

            <Separator />

            <div className="p-4">
                <form onSubmit={handleSearch} className="relative">
                    <Input
                        type="search"
                        placeholder="Buscar productos..."
                        className="w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0">
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Buscar</span>
                    </Button>
                </form>
            </div>

            <Separator />

            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`flex items-center py-2 px-3 rounded-md ${pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <Separator className="my-4" />

                <ul className="space-y-2">
                    <li>
                        <Link
                            href="/mi-cuenta?tab=favorites"
                            className={`flex items-center py-2 px-3 rounded-md ${pathname === "/mi-cuenta" && pathname.includes("favorites")
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted"
                                }`}
                        >
                            Mis Favoritos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/mi-cuenta"
                            className={`flex items-center py-2 px-3 rounded-md ${pathname === "/mi-cuenta" && !pathname.includes("favorites")
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted"
                                }`}
                        >
                            Mi Cuenta
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}


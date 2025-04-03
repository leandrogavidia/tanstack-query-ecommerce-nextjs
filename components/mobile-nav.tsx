"use client"


import { Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"


import { useAuth } from "./providers/use-auth"

import type React from "react"

const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: "/productos" },
]

interface MobileNavProps {
    onNavigate?: () => void;
}

export default function MobileNav({ onNavigate }: MobileNavProps) {
    const pathname = usePathname()
    const [searchQuery, setSearchQuery] = useState("")
    const { isAuthenticated, logout } = useAuth()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Search for:", searchQuery)
    }

    const handleLogout = () => {
        logout()
        if (onNavigate) onNavigate()
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold">NextStore</span>
                </Link>
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
                            href="/mi-cuenta?tab=favoritos"
                            className={`flex items-center py-2 px-3 rounded-md ${pathname === "/mi-cuenta" && pathname.includes("favoritos")
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted"
                                }`}
                        >
                            Mis Favoritos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/mi-cuenta?tab=perfil"
                            className={`flex items-center py-2 px-3 rounded-md ${pathname === "/mi-cuenta" && !pathname.includes("favoritos")
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted"
                                }`}
                        >
                            Mi Cuenta
                        </Link>
                    </li>
                </ul>
            </nav>

            <Separator />

            <div className="p-4">
                {isAuthenticated ? (
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                        Cerrar sesión
                    </Button>
                ) : (
                    <Button asChild className="w-full">
                        <Link href="/login" onClick={onNavigate}>
                            Iniciar sesión
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    )
}


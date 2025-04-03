"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


import FavoriteProducts from "@/components/favorite-products"
import OrderHistory from "@/components/order-history"
import { useAuth } from "@/components/providers/use-auth"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserProfile from "@/components/user-profile"

export default function AccountPage() {
    const { user, isAuthenticated, isLoading } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const tabParam = searchParams.get("tab")
    const [activeTab, setActiveTab] = useState("pedidos")

    useEffect(() => {
        if (tabParam && ["pedidos", "favoritos", "perfil"].includes(tabParam)) {
            setActiveTab(tabParam)
        }
    }, [tabParam])

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login?redirect=/mi-cuenta?tab=pedidos")
        }
    }, [isLoading, isAuthenticated, router])

    const handleTabChange = (value: string) => {
        setActiveTab(value)

        const params = new URLSearchParams(searchParams.toString())
        params.set("tab", value)
        router.push(`/mi-cuenta?${params.toString()}`)
    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Mi Cuenta</h1>

            <div className="mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Bienvenido, {user?.name}</CardTitle>
                        <CardDescription>Gestiona tu cuenta y revisa tus pedidos</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="mb-8">
                    <TabsTrigger value="pedidos">Mis Pedidos</TabsTrigger>
                    <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
                    <TabsTrigger value="perfil">Perfil</TabsTrigger>
                </TabsList>

                <TabsContent value="pedidos">
                    <OrderHistory />
                </TabsContent>

                <TabsContent value="favoritos">
                    <FavoriteProducts />
                </TabsContent>

                <TabsContent value="perfil">
                    <UserProfile />
                </TabsContent>
            </Tabs>
        </div>
    )
}


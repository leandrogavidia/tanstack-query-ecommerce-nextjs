"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"


import FavoriteProducts from "@/components/favorite-products"
import OrderHistory from "@/components/order-history"
import { useAuth } from "@/components/providers/use-auth"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserProfile from "@/components/user-profile"

export default function AccountPage() {
    const { user, isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login?redirect=/mi-cuenta")
        }
    }, [isLoading, isAuthenticated, router])

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

            <Tabs defaultValue="orders">
                <TabsList className="mb-8">
                    <TabsTrigger value="orders">Mis Pedidos</TabsTrigger>
                    <TabsTrigger value="favorites">Favoritos</TabsTrigger>
                    <TabsTrigger value="profile">Perfil</TabsTrigger>
                </TabsList>

                <TabsContent value="orders">
                    <OrderHistory />
                </TabsContent>

                <TabsContent value="favorites">
                    <FavoriteProducts />
                </TabsContent>

                <TabsContent value="profile">
                    <UserProfile />
                </TabsContent>
            </Tabs>
        </div>
    )
}


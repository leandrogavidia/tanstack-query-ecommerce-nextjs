"use client"


import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"


import { useAuth } from "@/components/providers/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type React from "react"


export default function LoginPage() {
    const { login, register, isLoading } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get("redirect") || "/"

    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await login(loginData.email, loginData.password)
            router.push(redirect)
        } catch (error) {
            console.error("Login failed:", error)
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await register(registerData.name, registerData.email, registerData.password)
            router.push(redirect)
        } catch (error) {
            console.error("Registration failed:", error)
        }
    }

    return (
        <div className="container mx-auto px-4 py-16 flex justify-center">
            <Card className="w-full max-w-md">
                <Tabs defaultValue="login">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                        <TabsTrigger value="register">Registrarse</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <form onSubmit={handleLogin}>
                            <CardHeader>
                                <CardTitle>Iniciar Sesión</CardTitle>
                                <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={loginData.email}
                                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        required
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Cargando..." : "Iniciar Sesión"}
                                </Button>
                            </CardFooter>
                        </form>
                    </TabsContent>

                    <TabsContent value="register">
                        <form onSubmit={handleRegister}>
                            <CardHeader>
                                <CardTitle>Crear Cuenta</CardTitle>
                                <CardDescription>Regístrate para comenzar a comprar</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input
                                        id="name"
                                        placeholder="Tu nombre"
                                        value={registerData.name}
                                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-email">Email</Label>
                                    <Input
                                        id="register-email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={registerData.email}
                                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-password">Contraseña</Label>
                                    <Input
                                        id="register-password"
                                        type="password"
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                        required
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Cargando..." : "Registrarse"}
                                </Button>
                            </CardFooter>
                        </form>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    )
}


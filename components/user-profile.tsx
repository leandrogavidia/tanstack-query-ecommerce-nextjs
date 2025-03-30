"use client"


import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useAuth } from "./providers/use-auth"

import type React from "react"


export default function UserProfile() {
    const { user, logout } = useAuth()
    const [profileData, setProfileData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    })
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Update profile:", profileData)
    }

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Update password:", passwordData)
    }

    return (
        <div className="space-y-6">
            <Tabs defaultValue="info">
                <TabsList>
                    <TabsTrigger value="info">Información personal</TabsTrigger>
                    <TabsTrigger value="password">Contraseña</TabsTrigger>
                    <TabsTrigger value="preferences">Preferencias</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="mt-6">
                    <Card>
                        <form onSubmit={handleProfileSubmit}>
                            <CardHeader>
                                <CardTitle>Información personal</CardTitle>
                                <CardDescription>Actualiza tu información personal</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input
                                        id="name"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Guardar cambios</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>

                <TabsContent value="password" className="mt-6">
                    <Card>
                        <form onSubmit={handlePasswordSubmit}>
                            <CardHeader>
                                <CardTitle>Cambiar contraseña</CardTitle>
                                <CardDescription>Actualiza tu contraseña de acceso</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Contraseña actual</Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">Nueva contraseña</Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Actualizar contraseña</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>

                <TabsContent value="preferences" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferencias</CardTitle>
                            <CardDescription>Gestiona tus preferencias de la cuenta</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="marketing" className="h-4 w-4" />
                                <Label htmlFor="marketing">Recibir emails de marketing</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="notifications" className="h-4 w-4" defaultChecked />
                                <Label htmlFor="notifications">Recibir notificaciones de pedidos</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="newsletter" className="h-4 w-4" />
                                <Label htmlFor="newsletter">Suscribirse al newsletter</Label>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Guardar preferencias</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

            <Card className="bg-destructive/5 border-destructive/20">
                <CardHeader>
                    <CardTitle className="text-destructive">Zona de peligro</CardTitle>
                    <CardDescription>Acciones irreversibles para tu cuenta</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Al cerrar tu cuenta, todos tus datos serán eliminados permanentemente. Esta acción no se puede deshacer.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button variant="destructive" onClick={logout}>
                        Cerrar sesión
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}


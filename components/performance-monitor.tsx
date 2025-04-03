"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { config } from "@/lib/config"

interface PerformanceData {
    timestamp: number
    fps: number
    memory: number
    cpuUsage: number
    renderTime: number
}

export default function PerformanceMonitor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])
    const [currentFps, setCurrentFps] = useState(0)
    const [currentMemory, setCurrentMemory] = useState(0)

    useEffect(() => {
        if (!config.analyticsTools) return

        const showMonitor = new URLSearchParams(window.location.search).get("showPerformance") === "true"
        setIsVisible(showMonitor)
    }, [])

    useEffect(() => {
        if (!isVisible || !isRecording) return

        let frameCount = 0
        let lastTime = performance.now()
        let rafId: number

        const measureFps = () => {
            frameCount++
            const now = performance.now()

            if (now - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (now - lastTime))
                setCurrentFps(fps)

                setPerformanceData((prev) => {
                    const newData = [
                        ...prev,
                        {
                            timestamp: Date.now(),
                            fps,
                            memory: currentMemory,
                            cpuUsage: 0,
                            renderTime: 0,
                        },
                    ]

                    if (newData.length > 60) {
                        return newData.slice(-60)
                    }
                    return newData
                })

                frameCount = 0
                lastTime = now
            }

            rafId = requestAnimationFrame(measureFps)
        }

        rafId = requestAnimationFrame(measureFps)

        // Monitorear memoria
        const memoryInterval = setInterval(() => {
            if (window.performance && (performance as any).memory) {
                const memoryInfo = (performance as any).memory
                const usedHeapSize = memoryInfo.usedJSHeapSize / (1024 * 1024) // MB
                setCurrentMemory(Math.round(usedHeapSize))
            }
        }, 1000)

        return () => {
            cancelAnimationFrame(rafId)
            clearInterval(memoryInterval)
        }
    }, [isVisible, isRecording, currentMemory])

    if (!isVisible) return null

    const chartData = performanceData.map((data, index) => ({
        name: index,
        fps: data.fps,
        memory: data.memory,
    }))

    return (
        <div className="fixed bottom-4 left-4 z-50 w-80 shadow-lg">
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium">Monitor de Rendimiento</CardTitle>
                        <Button
                            size="sm"
                            variant={isRecording ? "destructive" : "default"}
                            onClick={() => setIsRecording(!isRecording)}
                            className="h-7 text-xs"
                        >
                            {isRecording ? "Detener" : "Iniciar"}
                        </Button>
                    </div>
                    <CardDescription className="text-xs">
                        FPS: {currentFps} | Memoria: {currentMemory} MB
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="fps">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="fps">FPS</TabsTrigger>
                            <TabsTrigger value="memory">Memoria</TabsTrigger>
                        </TabsList>

                        <TabsContent value="fps" className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={false} />
                                    <YAxis domain={[0, 60]} />
                                    <Tooltip />
                                    <Bar dataKey="fps" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </TabsContent>

                        <TabsContent value="memory" className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={false} />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="memory" fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}


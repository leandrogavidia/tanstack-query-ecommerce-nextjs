"use client"

import { useEffect, useState } from "react"
import { onCLS, onFID, onLCP, onTTFB } from "web-vitals"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { config } from "@/lib/config"
import { cn } from "@/lib/utils"


type MetricName = "CLS" | "FID" | "LCP" | "TTFB"

interface Metric {
    name: MetricName
    value: number
    rating: "good" | "needs-improvement" | "poor"
    description: string
    target: number
}

export default function PerformanceAnalytics() {
    const [metrics, setMetrics] = useState<Metric[]>([])
    const [isVisible, setIsVisible] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        if (!config.analyticsTools) return

        const handleMetric = ({ name, value, rating }: any) => {
            const descriptions: Record<MetricName, string> = {
                CLS: "Cumulative Layout Shift - Mide la estabilidad visual",
                FID: "First Input Delay - Mide la interactividad",
                LCP: "Largest Contentful Paint - Mide la velocidad de carga",
                TTFB: "Time to First Byte - Mide la respuesta del servidor",
            }

            const targets: Record<MetricName, number> = {
                CLS: 0.1,
                FID: 100,
                LCP: 2500,
                TTFB: 800,
            }

            setMetrics((prev) => {
                const metricName = name as MetricName
                const newMetric: Metric = {
                    name: metricName,
                    value,
                    rating,
                    description: descriptions[metricName],
                    target: targets[metricName],
                }

                const exists = prev.some((m) => m.name === name)
                return exists ? prev.map((m) => (m.name === name ? newMetric : m)) : [...prev, newMetric]
            })
        }

        onCLS(handleMetric)
        onFID(handleMetric)
        onLCP(handleMetric)
        onTTFB(handleMetric)

        const timer = setTimeout(() => setIsVisible(true), 3000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (metrics.length >= 3) {
            const poorMetrics = metrics.filter((m) => m.rating === "poor")
            const needsImprovementMetrics = metrics.filter((m) => m.rating === "needs-improvement")

            if (poorMetrics.length > 0) {
                toast({
                    title: "Problemas de rendimiento detectados",
                    description: `${poorMetrics.length} métricas necesitan atención urgente.`,
                    duration: 5000,
                })
            } else if (needsImprovementMetrics.length > 0) {
                toast({
                    title: "Rendimiento mejorable",
                    description: `${needsImprovementMetrics.length} métricas podrían optimizarse.`,
                    duration: 5000,
                })
            }
        }
    }, [metrics, toast])

    if (!isVisible || metrics.length === 0) return null

    const getProgressColor = (rating: string) => {
        switch (rating) {
            case "good":
                return "bg-green-500"
            case "needs-improvement":
                return "bg-yellow-500"
            case "poor":
                return "bg-red-500"
            default:
                return "bg-primary"
        }
    }

    const getProgressValue = (metric: Metric) => {
        if (metric.name === "CLS") {
            return Math.min(100, (metric.value / metric.target) * 100)
        }

        return Math.min(100, (metric.value / metric.target) * 100)
    }

    return (
        <div className="hidden fixed bottom-4 left-4 z-50 w-80 shadow-lg md:block">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Análisis de Rendimiento</CardTitle>
                    <CardDescription className="text-xs">Métricas Web Vitals</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="metrics">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="metrics">Métricas</TabsTrigger>
                            <TabsTrigger value="info">Información</TabsTrigger>
                        </TabsList>

                        <TabsContent value="metrics" className="space-y-3 pt-3">
                            {metrics.map((metric) => (
                                <div key={metric.name} className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span>{metric.name}</span>
                                        <span
                                            className={
                                                metric.rating === "good"
                                                    ? "text-green-500"
                                                    : metric.rating === "needs-improvement"
                                                        ? "text-yellow-500"
                                                        : "text-red-500"
                                            }
                                        >
                                            {metric.name === "CLS" ? metric.value.toFixed(3) : `${metric.value.toFixed(0)}ms`}
                                        </span>
                                    </div>
                                    <Progress
                                        value={getProgressValue(metric)}
                                        className={cn("h-1.5", getProgressColor(metric.rating))}
                                    />
                                </div>
                            ))}

                            <div className="text-xs text-muted-foreground mt-2">
                                <p>Estas métricas son indicadores clave del rendimiento de la página.</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="info" className="pt-3">
                            <div className="space-y-2 text-xs">
                                {metrics.map((metric) => (
                                    <div key={metric.name}>
                                        <p className="font-medium">{metric.name}</p>
                                        <p className="text-muted-foreground">{metric.description}</p>
                                        <p
                                            className={
                                                metric.rating === "good"
                                                    ? "text-green-500"
                                                    : metric.rating === "needs-improvement"
                                                        ? "text-yellow-500"
                                                        : "text-red-500"
                                            }
                                        >
                                            Estado:{" "}
                                            {metric.rating === "good"
                                                ? "Bueno"
                                                : metric.rating === "needs-improvement"
                                                    ? "Mejorable"
                                                    : "Deficiente"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}


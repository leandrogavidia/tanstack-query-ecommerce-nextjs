"use client"

import { useChat } from "@ai-sdk/react"
import { Bot, User, X, Send, MessageSquare } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import MkLink from "@/components/mk-link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { config } from "@/lib/config"
import { cn } from "@/lib/utils"


import styles from "../styles/markdown.module.css";

interface ChatBotProps {
    embedded?: boolean
    className?: string
}

export default function ChatBot({ embedded = false, className }: ChatBotProps) {
    const [isOpen, setIsOpen] = useState(embedded)
    const [isMounted, setIsMounted] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()

    const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
        initialMessages: [
            {
                id: "1",
                role: "assistant",
                content: "¡Hola! Soy el asistente virtual de NextStore. ¿En qué puedo ayudarte hoy?",
            },
        ],
    })

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!embedded) {
            setIsOpen(false)
        }
    }, [pathname, embedded])

    if (!isMounted) {
        return null
    }

    console.log(messages.length)

    const chatWindow = (
        <Card
            className={cn(
                "flex flex-col shadow-xl overflow-auto",
                embedded ? className : "fixed bottom-4 right-4 w-[90vw] sm:w-[400px] h-[500px] z-50",
            )}
        >
            <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0 border-b">
                <CardTitle className="text-base font-medium flex items-center">
                    <Bot className="h-5 w-5 mr-2" />
                    Asistente de NextStore
                </CardTitle>
                {!embedded && (
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Cerrar</span>
                    </Button>
                )}
            </CardHeader>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn("flex items-start gap-3 text-sm", message.role === "user" ? "flex-row-reverse" : "")}
                        >
                            <Avatar className={cn("h-8 w-8", message.role === "user" ? "bg-primary" : "bg-muted")}>
                                <AvatarFallback>
                                    {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                </AvatarFallback>
                            </Avatar>

                            <div
                                className={cn(
                                    "rounded-lg px-3 py-2 max-w-[80%]",
                                    message.role === "user" ? "bg-primary text-white" : "bg-muted",
                                    styles.markdown
                                )}
                            >
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        a: MkLink
                                    }}
                                >
                                    {message.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3 text-sm">
                            <Avatar className="h-8 w-8 bg-muted">
                                <AvatarFallback>
                                    <Bot className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="rounded-lg px-3 py-2 max-w-[80%] bg-muted">
                                <div className="flex space-x-1">
                                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                                    <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-75" />
                                    <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-150" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            <CardFooter className="p-3 pt-0 border-t flex flex-col justify-center items-center gap-y-4">
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <Input
                        id="prompt"
                        placeholder="Escribe tu mensaje..."
                        className="flex-1"
                        value={input}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        name="prompt"
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        <Send className="h-4 w-4  text-white" />
                        <span className="sr-only">Enviar</span>
                    </Button>
                </form>
                {
                    messages.length === 1 && (
                        <Button variant="secondary" size="sm" className="h-12 w-full" onClick={() => append({ role: "user", content: "¿Qué productos electrónicos venden?" })}>
                            ¿Qué productos electrónicos venden?
                        </Button>
                    )
                }
            </CardFooter>
        </Card>
    )

    if (embedded) {
        return chatWindow
    }

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className={cn("fixed h-12 w-12 rounded-full shadow-lg", config.analyticsTools ? "bottom-20 right-3" : "bottom-4 right-4")}
                aria-label="Abrir chat"
            >
                <MessageSquare className="h-6 w-6" />
            </Button>

            {isOpen && chatWindow}
        </>
    )
}


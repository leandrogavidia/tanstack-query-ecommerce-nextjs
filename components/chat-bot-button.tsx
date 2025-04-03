"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import ChatBot from "@/components/chat-bot"

export default function ChatBotButton() {
    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    if (pathname === "/") return null

    return <ChatBot />
}


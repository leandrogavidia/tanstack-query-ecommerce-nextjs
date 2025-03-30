"use client"

import { useState, useCallback } from "react"

import type React from "react"

export type ToastProps = {
  title?: string
  description?: string
  action?: React.ReactNode
  duration?: number
}

type ToastState = {
  toasts: Array<ToastProps & { id: string }>
}

const TOAST_LIMIT = 3

export const useToast = () => {
  const [state, setState] = useState<ToastState>({ toasts: [] })

  const toast = useCallback(({ ...props }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)

    setState((state) => {
      const newToasts = [...state.toasts, { id, ...props }]

      if (newToasts.length > TOAST_LIMIT) {
        newToasts.shift()
      }

      return {
        ...state,
        toasts: newToasts,
      }
    })

    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setState((state) => ({
      ...state,
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  }, [])

  const dismissAll = useCallback(() => {
    setState((state) => ({
      ...state,
      toasts: [],
    }))
  }, [])

  return {
    toast,
    dismiss,
    dismissAll,
    toasts: state.toasts,
  }
}

export type UseToastReturn = ReturnType<typeof useToast>


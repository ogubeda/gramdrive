import React, { createContext, useContext } from 'react'
import { useFetch } from "@/lib/hooks/useFetch"
import { messagesApiService } from "@/services/api/telegram/messages.api.service"

interface MessagesContextType {
  data: any
  isLoading: boolean
  refetch: () => Promise<any>
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined)

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, refetch } = useFetch(() => messagesApiService.getMessages(), [])
  
  return (
    <MessagesContext.Provider value={{ data, isLoading, refetch }}>
      {children}
    </MessagesContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(MessagesContext)
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider')
  }
  return context
}
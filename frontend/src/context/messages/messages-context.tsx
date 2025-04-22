import React, { createContext, useContext, useState } from 'react'
import { useFetch } from "@/lib/hooks/useFetch"
import { messagesApiService } from "@/services/api/telegram/messages.api.service"
import { Message } from '@/lib/types/message.type'

interface MessagesContextType {
  data: Message[] | null
  isLoading: boolean
  refetch: () => Promise<void>,
  messageToUpdate: Message | null,
  setMessageToUpdate: (message: Message | null) => void
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined)

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, refetch } = useFetch(() => messagesApiService.getMessages(), [])
  const [messageToUpdate, setMessageToUpdate] = useState<Message | null>(null)
  
  return (
    <MessagesContext.Provider value={{ data, isLoading, refetch, messageToUpdate, setMessageToUpdate }}>
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
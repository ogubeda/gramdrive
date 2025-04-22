import { API_TELEGRAM_MESSAGES } from "@/lib/constants/api.constants"
import { Message } from "@/lib/types/message.type"

export const messagesApiService = {
  getMessages: async (): Promise<Message[]> => {
    return fetch(`${API_TELEGRAM_MESSAGES}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
    .catch(() => ({ files: [] }))
  },
  createMessage: async (message: string) => {
    return fetch(`${API_TELEGRAM_MESSAGES}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    }).then(res => res.json())
    .catch(() => ({ success: false }))
  },
  updateMessage: async (messageId: number, message: string) => {
    return fetch(`${API_TELEGRAM_MESSAGES}/${messageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    }).then(res => res.json())
    .catch(() => ({ success: false }))
  },
  deleteMessage: async (messageId: number) => {
    return fetch(`${API_TELEGRAM_MESSAGES}/${messageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
    .catch(() => ({ success: false }))
    
  }
}
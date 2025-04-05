import { API_TELEGRAM_MESSAGES } from "@/lib/constants/api.constants"

export const messagesApiService = {
  getMessages: async () => {
    return fetch(`${API_TELEGRAM_MESSAGES}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
    .catch(() => ({ files: [] }))
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
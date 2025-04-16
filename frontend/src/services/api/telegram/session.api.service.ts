import { API_TELEGRAM_CHECK_SESSION, API_TELEGRAM_CONFIRM_LOGIN, API_TELEGRAM_LOGIN } from "@/lib/constants/api.constants"

export const sessionApiService = {
  login: async (phone: string) => {
    return fetch(API_TELEGRAM_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    }).then(res => res.json())
    .catch(() => ({ success: false }))
  },
  confirmLogin: async (phone: string, code: string, codeHash: string) => {
    return fetch(API_TELEGRAM_CONFIRM_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, code, codeHash }),
    }).then(res => res.json())
    .catch(() => ({ success: false }))
  },
  
  checkAuth: async () => {
    return fetch(`${API_TELEGRAM_CHECK_SESSION}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
    .catch(() => ({ success: false }))
  },
}
import { API_TELEGRAM_LOGIN } from "../../../lib/constants/api.constants"

export const authApiService = {
  telegramLogin: (phone: string) => {
    return fetch(API_TELEGRAM_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    })
  },
}
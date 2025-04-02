import { useEffect } from "react"
import { telegramApiService } from "@/services/api/telegram/telegram.api.service"

export function Messages() {
  useEffect(() => {
    telegramApiService.getMessages().then(data => console.log(data))
  }, [])

  return (
    <>
      <h1>Messages</h1>
    </>
  )
}
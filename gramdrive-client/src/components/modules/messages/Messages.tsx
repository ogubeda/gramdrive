import { useEffect } from "react"
import { telegramApiService } from "@/services/api/telegram/telegram.api.service"

interface Props {
  phone: string
}

export function Messages({ phone }: Props) {
  useEffect(() => {
    if (!phone) return

    telegramApiService.getMessages(phone).then(data => console.log(data))
  }, [phone])

  // const data = use(telegramApiService.getMessages(phone))

  return (
    <>
      <h1>Messages</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  )
}
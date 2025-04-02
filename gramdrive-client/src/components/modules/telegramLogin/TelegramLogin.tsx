import { useState } from "react"
import { telegramApiService } from "@/services/api/telegram/telegram.api.service"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TelegramLogin () {
  const [phone, setPhone] = useState<string>('')
  const navigate = useNavigate()

  const handleClick = async () => {
    // const check = await telegramApiService.checkLogin(phone)
    // if (check.success) return navigate(`/messages/${phone}`)
    
    const res = await telegramApiService.login(phone)
    if (res.success) return navigate(`/verification/${phone}/${res.phone_code_hash}`)
  }

  return (
    <>
      <main>
        <h1>Telegram Login</h1>
        <div>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Button onClick={handleClick}>
            Login
          </Button>
        </div>
      </main>
    </>
  )
}
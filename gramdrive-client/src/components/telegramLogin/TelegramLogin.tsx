import { useState } from "react"
import { authApiService } from "../../services/api/auth/auth.api.service"
import { ButtonUI } from "../ui/ButtonUI"
import { InputUI } from "../ui/InputUI"

export function TelegramLogin () {
  const [phone, setPhone] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [startIsOk, setStartIsOk] = useState<boolean>(false)


  const handleClick = async () => {
    const res = await authApiService.telegramLogin(phone)
    setStartIsOk(res.ok)
  }

  return (
    <>
      <main>
        <h1>Telegram Login</h1>
        <div>
          <InputUI value={phone} onChange={(e) => setPhone(e.target.value)} />
          <ButtonUI onClick={handleClick}>
            Login
          </ButtonUI>
        </div>
      </main>
    </>
  )
}
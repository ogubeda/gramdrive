import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { telegramApiService } from "@/services/api/telegram/telegram.api.service"

export function VerificationPage() {
  const [code, setCode] = useState<string>('')
  const { phone } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code || !phone) return

    const res = await telegramApiService.confirmLogin(phone, code)

    if (res.success) navigate(`/messages/${phone}`)
  }

  return (
    <>
      <main>
        <h1>Verification</h1>
        <form onSubmit={handleSubmit}>
          <Input value={code} onChange={(e) => setCode(e.target.value)} />
          <Button type="submit">
            Verify
          </Button>
        </form>
      </main>
    </>
  )
}
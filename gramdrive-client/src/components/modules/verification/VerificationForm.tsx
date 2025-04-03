import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useNavigate } from "react-router"
import { telegramApiService } from "@/services/api/telegram/telegram.api.service"

interface Props {
  phone: string
  codeHash: string
}
export function VerificationForm({ phone, codeHash }: Props) {
  const [code, setCode] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code || !phone || !codeHash) return

    const res = await telegramApiService.confirmLogin(phone, code, codeHash)

    if (res.success) navigate(`/messages`)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input 
          className="w-full bg-white/5 backdrop-blur-md border border-white/20 rounded-md py-2 px-4 text-white placeholder-white/70 focus:outline-none focus:ring-0 focus:border-white/20 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-white/20"
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
        />
        <Button
          className="bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-0 focus-visible:outline-none hover:bg-white/10 transition-colors"
          type="submit"
        >
          Verify
        </Button>
      </form>
    </>
  )
}
import { useState } from "react"
import { sessionApiService } from "@/services/api/telegram/session.api.service"
import { Loader2 } from "lucide-react"
import { useNavigate } from "react-router"
import { GlassButton } from "@/components/ui/glass/glass-button"
import { GlassInput } from "@/components/ui/glass/glass-input"

export function TelegramLogin () {
  const [phone, setPhone] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!phone) return

    setIsLoading(true)
    const res = await sessionApiService.login(phone)
    setIsLoading(false)
    if (res.success) {
      navigate(`/verification/${phone}/${res.phone_code_hash}`)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <GlassInput
          disabled={isLoading} 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
        />
          
        <GlassButton
          disabled={isLoading} 
          type="submit"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </GlassButton>
      </form>
    </>
  )
}
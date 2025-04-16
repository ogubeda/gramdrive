import { useState } from "react"
import { useNavigate } from "react-router"
import { sessionApiService } from "@/services/api/telegram/session.api.service"
import { Loader2 } from "lucide-react"
import { GlassButton } from "@/components/ui/glass/GlassButton"
import { GlassOTP } from "@/components/ui/glass/GlassOTP"

interface Props {
  phone: string
  codeHash: string
}
export function VerificationForm({ phone, codeHash }: Props) {
  const [code, setCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code || !phone || !codeHash) return

    setIsLoading(true)
    const res = await sessionApiService.confirmLogin(phone, code, codeHash)
    setIsLoading(false)

    if (res.success) navigate(`/`)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        
        <GlassOTP
          groups={1}
          slotsPerGroup={5}
          maxLength={5}
          value={code}
          onChange={setCode}
        />
        <GlassButton
          className="w-full"
          disabled={isLoading}
          type="submit"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify
        </GlassButton>
      </form>
    </>
  )
}
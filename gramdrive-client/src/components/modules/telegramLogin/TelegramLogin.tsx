import { useState } from "react"
import { telegramApiService } from "@/services/api/telegram/telegram.api.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigateWithTransition } from "@/lib/hooks/useNavigateWithTransition"
import { Loader } from "lucide-react"

export function TelegramLogin () {
  const [phone, setPhone] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const navigate = useNavigateWithTransition()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!phone) return

    setIsLoading(true)
    const res = await telegramApiService.login(phone)
    setIsLoading(false)
    setIsSuccess(res.success)
    if (res.success) {
      return navigate(`/verification/${phone}/${res.phone_code_hash}`)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       {
        isLoading && (
          <Loader />
        )
       }
        <Input
          disabled={(isLoading || isSuccess)} 
          className="w-full bg-white/5 backdrop-blur-md border border-white/20 rounded-md py-2 px-4 text-white placeholder-white/70 focus:outline-none focus:ring-0 focus:border-white/20 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-white/20"
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
        />
          
        <Button
          disabled={isLoading} 
          className="bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-0 focus-visible:outline-none hover:bg-white/10 transition-colors"
          type="submit"
        >
          Login
        </Button>
      </form>
    </>
  )
}
import { GlassButton } from "../../ui/glass/glass-button"
import Telegram from "@/assets/icons/telegram.svg?react"
import { GlassInput } from "../../ui/glass/glass-input"
import { useState } from "react"
import { messagesApiService } from "@/services/api/telegram/messages.api.service"
import { useMessages } from "@/context/messages/messages-context"

export function CreateMessage() {
  const [value, setValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { refetch } = useMessages()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!value) return

    try {
      setIsLoading(true)
      const res = await messagesApiService.createMessage(value)
  
      if (res.success) {
        setValue('')
        refetch()
      }
    } catch {
      console.log('Error fetching')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      
      <form className="flex flex-row gap-2" onSubmit={handleSubmit}>
        <GlassInput 
          className="h-12" 
          value={value} 
          onChange={e => setValue(e.target.value)} 
          placeholder="Message text"
          disabled={isLoading} 
        />
        <GlassButton 
          type="submit" 
          className="h-12 w-12"
          disabled={isLoading}
        >
          <Telegram />
        </GlassButton>
      </form>
    </>
  )
}
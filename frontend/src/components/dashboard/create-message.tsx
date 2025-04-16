import { GlassButton } from "../ui/glass/glass-button"
import Plus from "@/assets/icons/plus.svg?react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { glassPopoverContent } from "@/lib/constants/class-names.constants"
import { GlassInput } from "../ui/glass/glass-input"
import { useState } from "react"
import { messagesApiService } from "@/services/api/telegram/messages.api.service"
import { useMessages } from "@/context/messages/messages-context"

export function CreateMessage() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const { refetch } = useMessages()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!value) return

    const res = await messagesApiService.createMessage(value)

    if (res.success) {
      setValue('')
      refetch()
      setIsOpen(false)
    }
  }

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <GlassButton className="w-full gap-1" onClick={() => setIsOpen(true)}>
            <Plus className="w-4 h-4" />
            Create
          </GlassButton>
        </PopoverTrigger>
        <PopoverContent className={glassPopoverContent}>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <GlassInput value={value} onChange={e => setValue(e.target.value)} placeholder="Message text" />
            <GlassButton type="submit">Create</GlassButton>
          </form>
        </PopoverContent>
      </Popover>
    </>
  )
}
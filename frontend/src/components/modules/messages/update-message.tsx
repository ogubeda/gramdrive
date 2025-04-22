import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { GlassButton } from "@/components/ui/glass/glass-button"
import { useMessages } from "@/context/messages/messages-context"
import { glassPopoverContent } from "@/lib/constants/class-names.constants"
import XIcon from "@/assets/icons/x.svg?react"
import { GlassInput } from "@/components/ui/glass/glass-input"
import { useEffect, useState } from "react"
import { messagesApiService } from "@/services/api/telegram/messages.api.service"

export function UpdateMessage() {
  const { messageToUpdate, setMessageToUpdate, refetch } = useMessages()
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setValue(messageToUpdate?.text || '')
  }, [messageToUpdate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageToUpdate) return
    
    await messagesApiService.updateMessage(messageToUpdate.id, value)

    setMessageToUpdate(null)
    refetch()
  }


  return (
    <>
      <Dialog open={!!messageToUpdate} onOpenChange={() => setMessageToUpdate(null)}>
        <DialogContent className={`${glassPopoverContent} p-6 [&>button:last-child]:hidden`}>
          <DialogHeader>
            <DialogTitle className="text-white flex items-center justify-between">
              <span>Update Message</span>
              <DialogClose asChild>
                <GlassButton className="w-8 h-8 rounded-full">
                  <XIcon className="w-4 h-4" />
                </GlassButton>
              </DialogClose>
            </DialogTitle>
            <DialogDescription>
              Edit the message text
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <GlassInput id="message" name="message" placeholder="Change message text" value={value} onChange={(e) => setValue(e.target.value)} />
              <GlassButton type="submit" className="mt-4">Update</GlassButton>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
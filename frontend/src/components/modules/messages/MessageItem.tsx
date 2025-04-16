import { Card, CardContent } from "@/components/ui/card"
import { GlassButton } from "@/components/ui/glass/GlassButton"
import DotsVertical from "@/assets/icons/dots-vertical.svg?react"
import Trash from "@/assets/icons/trash.svg?react"
import { glassMenuItem, glassPopoverContent } from "@/lib/constants/classNames.constants"
import { messagesApiService } from "@/services/api/telegram/messages.api.service"
import { useMessages } from "@/context/messages/MessagesContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Props {
  msg: any
}
export function MessageItem({ msg }: Props) {
  const { refetch } = useMessages()

  const handleDeleteClick = async () => {
    const res = await messagesApiService.deleteMessage(msg.id)

    if (res.success) refetch()
  }

  return (
    <>
      <Card className="bg-white/5 border backdrop-blur-md border-white/20 rounded-xl shadow-lg py-4">
        <CardContent>
          <div className="flex justify-between gap-2 items-center">
            <p className="text-stone-300 truncate">{msg.text}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <GlassButton className="w-8 h-8 rounded-full">
                  <DotsVertical />
                </GlassButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={glassPopoverContent}>
              <DropdownMenuGroup>
                <DropdownMenuItem className={glassMenuItem}>
                  <div className="flex items-center gap-2">
                    <Trash className="w-4 h-4" />
                    <span>
                      Edit Text
                    </span>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  className={glassMenuItem}
                  onClick={handleDeleteClick}
                >
                  <div className="flex items-center gap-2">
                    <Trash className="w-4 h-4" />
                    <span>
                      Delete
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
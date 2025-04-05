import { Card, CardContent } from "@/components/ui/card"
import { GlassButton } from "@/components/ui/glass/GlassButton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import DotsVertical from "@/assets/icons/dots-vertical.svg?react"
import Trash from "@/assets/icons/trash.svg?react"
import { glassMenuItem } from "@/lib/constants/classNames.constants"
import { messagesApiService } from "@/services/api/telegram/messages.api.service"

interface Props {
  msg: any
  itemChange: () => void

}
export function MessageItem({ msg, itemChange }: Props) {

  const handleDeleteClick = async () => {
    const res = await messagesApiService.deleteMessage(msg.id)

    if (res.success) itemChange()
  }

  return (
    <>
      <Card className="bg-white/5 border border-white/20 rounded-xl shadow-lg py-4">
        <CardContent>
          <div className="flex justify-between gap-2 items-center">
            <p className="text-stone-300 truncate">{msg.text}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <GlassButton className="w-8 h-8 rounded-full">
                  <DotsVertical />
                </GlassButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2 m-1 min-w-64 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl shadow-lg py-4 z-[9999]">
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
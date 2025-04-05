import { useFetch } from "@/lib/hooks/useFetch"
import { MessageItem } from "./MessageItem"
import { ScrollArea } from "@/components/ui/scroll-area"
import { messagesApiService } from "@/services/api/telegram/messages.api.service"

export function Messages() {
  const { data, isLoading, refetch } = useFetch(() => messagesApiService.getMessages(), [])

  return (
    <>
      <ScrollArea className="h-screen w-full rounded-md p-4">
        {isLoading && <p>Loading...</p>}
        {
          !isLoading && data && (
            <div className="grid grid-cols-5 gap-4 fade-in-3">
              { data.messages.map(msg => <MessageItem key={msg.id} msg={msg} itemChange={refetch} />) }
            </div>
          )
        }
      </ScrollArea>
    </>
  )
}
import { MessageItem } from "./message-item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMessages } from "@/context/messages/messages-context"

export function Messages() {
  const { data, isLoading } = useMessages()

  return (
    <>
      <ScrollArea className="h-screen w-full rounded-md">
        {isLoading && <p>Loading...</p>}
        {
          !isLoading && data && (
            <div className="grid grid-cols-5 gap-4 fade-in-3">
              { data.messages.map(msg => <MessageItem key={msg.id} msg={msg} />) }
            </div>
          )
        }
      </ScrollArea>
    </>
  )
}
import { Messages } from "@/components/modules/messages/Messages"
import { MessagesHeader } from "@/components/modules/messages/MessagesHeader"
import { MessagesSideBar } from "@/components/modules/messages/MessagesSideBar"
import { MessagesProvider } from "@/context/messages/MessagesContext"

export function MessagesPage() {
  return (
    <>
      <MessagesProvider>
        <main className="w-full h-screen p-8 flex flex-row gap-4">
          <MessagesSideBar />
          <div className="flex flex-col gap-4">
            <MessagesHeader />
            <Messages />
          </div>
        </main>
      </MessagesProvider>
    </>
  )
}
import { Messages } from "@/components/modules/messages/messages"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSideBar } from "@/components/dashboard/dashboard-sidebar"
import { MessagesProvider } from "@/context/messages/messages-context"
import { CreateMessage } from "@/components/modules/messages/create-message"
import { UpdateMessage } from "@/components/modules/messages/update-message"

export function DashboardPage() {
  return (
    <>
      <MessagesProvider>
        <main className="w-screen h-screen p-8 grid grid-cols-8 grid-rows-1 gap-4">
          <div className="col-span-1">
            <DashboardSideBar />
          </div>
          <div className="col-span-7 flex flex-col gap-4">
            <DashboardHeader />
            <Messages />
            <CreateMessage />
            <UpdateMessage />
          </div>
        </main>
      </MessagesProvider>
    </>
  )
}
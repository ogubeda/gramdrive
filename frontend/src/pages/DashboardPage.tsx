import { Messages } from "@/components/modules/messages/Messages"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DashboardSideBar } from "@/components/dashboard/DashboardSideBar"
import { MessagesProvider } from "@/context/messages/MessagesContext"

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
          </div>
        </main>
      </MessagesProvider>
    </>
  )
}
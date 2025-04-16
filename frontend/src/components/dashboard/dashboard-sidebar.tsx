import { CreateMessage } from "./create-message"

export function DashboardSideBar() {
  return (
    <>
      <div className="h-full text-stone-300 bg-white/5 border border-white/20 rounded-xl shadow-lg p-4 backdrop-blur-md shadow-lg">
        <CreateMessage />
      </div>
    </>
  )
}
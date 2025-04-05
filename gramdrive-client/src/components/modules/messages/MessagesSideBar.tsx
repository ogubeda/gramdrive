import { GlassButton } from "@/components/ui/glass/GlassButton"
import Plus from "@/assets/icons/plus.svg?react"
export function MessagesSideBar() {
  return (
    <>
      <div className="min-w-[300px] text-stone-300 bg-white/5 border border-white/20 rounded-xl shadow-lg p-4 backdrop-blur-md shadow-lg">
        <GlassButton className="w-full gap-1">
          <Plus className="w-4 h-4" />
          Create
        </GlassButton>
      </div>
    </>
  )
}
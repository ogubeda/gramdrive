import { GlassButton } from "../ui/glass/GlassButton"
import Plus from "@/assets/icons/plus.svg?react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { glassPopoverContent } from "@/lib/constants/classNames.constants"
import { GlassInput } from "../ui/glass/GlassInput"
import { useState } from "react"

export function CreateMessage() {
  const [value, setValue] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <GlassButton className="w-full gap-1">
            <Plus className="w-4 h-4" />
            Create
          </GlassButton>
        </PopoverTrigger>
        <PopoverContent className={glassPopoverContent}>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <GlassInput value={value} onChange={e => setValue(e.target.value)} placeholder="Message text" />
            <GlassButton type="submit">Create</GlassButton>
          </form>
        </PopoverContent>
      </Popover>
    </>
  )
}
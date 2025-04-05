import { cn } from "@/lib/utils"
import { Input } from "../input"
import { glassInputClassNames } from "@/lib/constants/classNames.constants"

export function GlassInput({ ...props }: React.ComponentProps<typeof Input>) {
  const { className, ...rest } = props

  return (
    <>
      <Input
        className={cn(
          glassInputClassNames,
          className
        )}
        { ...rest }
      />
    </>
  )
}
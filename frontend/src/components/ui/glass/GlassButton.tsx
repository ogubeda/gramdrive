import { cn } from "@/lib/utils";
import { Button } from "../button";
import { glassButtonClassNames } from "@/lib/constants/classNames.constants";

interface Props extends React.ComponentProps<typeof Button> {
  children: React.ReactNode
}

export function GlassButton({ children, ...props }: Props) {
  const { className, ...rest } = props

  return (
    <>
      <Button
        className={cn(
          glassButtonClassNames,
          className
        )}
        {...rest}
      >
        {children}
      </Button>
    </>
  )
}
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../input-otp"
import { glassInputOTPClassNames } from "@/lib/constants/classNames.constants"

interface Props {
  groups: number
  slotsPerGroup: number
  maxLength: number,
  value: string
  onChange: (value: string) => void
}

export function GlassOTP({ groups, slotsPerGroup, maxLength, value, onChange }: Props) {
  return (
    <>
      <InputOTP 
        maxLength={maxLength} 
        value={value} 
        onChange={onChange}
        autoFocus
      >
        {
          Array(groups)
            .fill(0)
            .map((_, i) => (
              <InputOTPGroup className="space-x-2" key={i}>
                {Array(slotsPerGroup)
                  .fill(0)
                  .map((_, j) => (
                    <>
                      <InputOTPSlot
                        className={glassInputOTPClassNames}
                        key={j} 
                        index={i * slotsPerGroup + j} 
                      />                
                    </>
                  ))}
              </InputOTPGroup>
            ))
        }
      </InputOTP>
    </>
  )
}
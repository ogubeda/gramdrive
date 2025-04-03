import {  useParams } from "react-router"
import { VerificationForm } from "@/components/modules/verification/VerificationForm"

export function VerificationPage() {
  const { phone, codeHash } = useParams()

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          {
            (!phone || !codeHash) ?
            <p className="text-stone-300 font-light text-sm">To start using Gramdrive, you need to login.</p>
            :
            (
              <>
                <p className="text-stone-300 font-light text-sm">You have recevived a verification code in the Telegram App.</p>
                <p className="text-stone-300 font-light text-sm">Please, enter the code here.</p>
              </>
            )
          }
          
        </div>
        {
          phone && codeHash &&
          <VerificationForm phone={phone} codeHash={codeHash} />
        }
      </div>
    </>
  )
}
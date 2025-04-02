import { useParams } from "react-router"
import { Messages } from "@/components/modules/messages/Messages"

export function MessagesPage() {
  const { phone } = useParams()

  return (
    <>
      <main>
        <Messages phone={phone || ''} />
      </main>
    </>
  )
}
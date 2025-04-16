import { TelegramLogin } from "@/components/modules/telegramLogin/telegram-login"

export function LoginPage() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-stone-300 font-light text-sm">To start using Gramdrive, you need to login.</p>
          <p className="text-stone-300 font-light text-sm">Please, enter your phone number.</p>
        </div>
        <TelegramLogin />
      </div>
    </>
  )
}
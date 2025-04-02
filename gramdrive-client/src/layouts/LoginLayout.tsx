import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Outlet } from "react-router"

export function LoginLayout() {
  return (
    <main className="flex flex-col h-screen w-screen items-center justify-center">
      <Card className="min-w-[450px] bg-white/5 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-3xl uppercase tracking-wide text-stone-200">Gramdrive</CardTitle>
        </CardHeader>
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </main>
  )
}
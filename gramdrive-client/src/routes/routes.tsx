import { Route, Routes } from "react-router"
import { LoginPage } from "../pages/Login"
import { VerificationPage } from "../pages/Verification"
import { DashboardPage } from "../pages/DashboardPage"
import { LoginLayout } from "@/layouts/LoginLayout"

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verification/:phone/:codeHash" element={<VerificationPage />} />
        </Route>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </>
  )
}
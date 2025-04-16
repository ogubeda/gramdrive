import { Route, Routes } from "react-router"
import { LoginPage } from "../pages/login.page"
import { VerificationPage } from "../pages/verification.page"
import { DashboardPage } from "../pages/dashboard.page"
import { LoginLayout } from "@/layouts/login-layout"

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
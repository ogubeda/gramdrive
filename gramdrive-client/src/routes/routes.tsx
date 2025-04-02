import { Route, Routes } from "react-router"
import { LoginPage } from "../pages/Login"
import { VerificationPage } from "../pages/Verification"
import { MessagesPage } from "../pages/Messages"

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verification/:phone" element={<VerificationPage />} />
        <Route path="/messages/:phone" element={<MessagesPage />} />
      </Routes>
    </>
  )
}
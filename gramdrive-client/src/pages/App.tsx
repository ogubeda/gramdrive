import { BrowserRouter } from "react-router"
import { AppRoutes } from "../routes/routes"

import "@/styles/App.css"

function App() {

  return (
    <>
      <BrowserRouter>
        <AppRoutes />      
      </BrowserRouter>
    </>
  )
}

export default App

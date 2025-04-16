import { useNavigate } from "react-router"

export function useNavigateWithTransition() {
  const navigate = useNavigate()

  return (path: string) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate(path)
      })
    } else {
      navigate(path)
    }
  }
}
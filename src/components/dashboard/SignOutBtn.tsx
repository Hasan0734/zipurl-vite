import  { useTransition } from "react"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { LogOutIcon } from "lucide-react"
import { Spinner } from "../ui/spinner"
import { useAuth } from "@/hooks/use-auth"


const SignOutBtn = () => {
  const [isPending, startTransition] = useTransition()
  const auth = useAuth()

  const handleSignOut = () => {
    startTransition(async () => {
        auth.logout()
    })
  }
  return (
    <DropdownMenuItem onClick={handleSignOut}>
      {isPending ? <Spinner /> : <LogOutIcon />}
      Sign Out
    </DropdownMenuItem>
  )
}

export default SignOutBtn

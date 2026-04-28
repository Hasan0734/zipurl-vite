import  { useTransition } from "react"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { LogOutIcon } from "lucide-react"
import { Spinner } from "../ui/spinner"


const SignOutBtn = () => {
  const [isPending, startTransition] = useTransition()

  const handleSignOut = () => {
    startTransition(async () => {
      // await signOutAction()
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

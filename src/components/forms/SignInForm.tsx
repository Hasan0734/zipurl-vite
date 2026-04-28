import { AtSign, Lock } from "lucide-react"
import { Button } from "../ui/button"
import { FieldError, FieldGroup } from "../ui/field"
import { useForm } from "@tanstack/react-form"
import { useState, useTransition } from "react"
import { Spinner } from "../ui/spinner"
import TextInput from "../TextInput"

interface SigninFormProps {
  setRequireOtp: React.Dispatch<React.SetStateAction<boolean>>
  setEmail: React.Dispatch<React.SetStateAction<string>>
}

const SignInForm = ({ setRequireOtp, setEmail }: SigninFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState("")

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      // onSubmit: loginUserSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        // const res = await loginAction(value)
        // console.log(res)

        // if (res.success && !res?.twoFARequired) {
        //   redirect("/dashboard")

        // }
        setRequireOtp(true)
        setEmail(value.email)

        // setMessage(res.message || "Sign in failed")

        // await authClient.signIn.email(
        //   {
        //     email: "test@user.com",
        //     password: "password1234",
        //   },
        //   {
        //     onSuccess(ctx) {
        //     console.log(ctx)
        //     },
        //   }
        // )
      })

      // form.reset()
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-6"
    >
      <FieldGroup>
        <TextInput
          label="Email"
          name="email"
          id="email"
          icon={AtSign}
          placeholder="name@company.com"
          type="email"
          form={form}
        />

        <TextInput
          label="Password"
          name="password"
          id="password"
          icon={Lock}
          placeholder="••••••••"
          forgot_password
          type="password"
          form={form}
        />
      </FieldGroup>
      {message && <FieldError>{message}</FieldError>}
      <Button
        disabled={isPending}
        size={"lg"}
        className="h-11! w-full"
        type="submit"
      >
        {isPending && <Spinner />} Sign In
      </Button>
    </form>
  )
}

export default SignInForm

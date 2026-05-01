import { ArrowRight, AtSign, Lock, ShieldCheck, User } from "lucide-react"
import React from "react"
import TextInput from "../TextInput"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"

const SignUpForm = () => {
  return (
    <form action="#" className="space-y-6">
      {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="First Name"
            id="first_name"
            icon={User}
            placeholder="Alex"
          />
          <TextInput
            label="Last Name"
            id="last_name"
            icon={User}
            placeholder="Revra"
          />
        </div>

        <TextInput
          label="Email"
          id="email"
          icon={AtSign}
          placeholder="name@company.com"
          type="email"
          className="col-span-2"
        />

        <TextInput
          className="col-span-2 sm:col-span-1"
          label="Password"
          id="password"
          icon={Lock}
          placeholder="••••••••"
          type="password"
        />
        <TextInput
         className="col-span-2 sm:col-span-1"
          label="Confirm Password"
          id="confirm_password"
          icon={ShieldCheck}
          placeholder="••••••••"
          type="password"
        />
      </div> */}
      <div className="flex items-start gap-3 px-1">
        <div className="flex h-5 items-center">
          <Checkbox id="terms" />
        </div>
        <label
          className="text-on-surface-variant text-sm leading-tight"
          htmlFor="terms"
        >
          I agree to the{" "}
          <a
            className="text-primary underline-offset-4 hover:underline"
            href="#"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            className="text-primary underline-offset-4 hover:underline"
            href="#"
          >
            Privacy Policy
          </a>
          .
        </label>
      </div>
      <Button
        size={'lg'}
        className="w-full h-11!"
        type="submit"
      >
        Create account <ArrowRight />
      </Button>
    </form>
  )
}

export default SignUpForm

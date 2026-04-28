import SignInForm from "@/components/forms/SignInForm"
import { Button } from "@/components/ui/button"

import { useState } from "react"
import OtpForm from "./forms/OtpForm"


const SignInSection = () => {
  const [requireOtp, setRequireOtp] = useState(false);
  const [email, setEmail] = useState('')
  return (
    <div>
      {!requireOtp ? (
        <div className="glass-card emerald-glow w-full max-w-120 rounded-[2rem] bg-background! p-10 md:p-12">
          <div>
            <header className="mb-10">
              <h1 className="mb-2 text-xl font-bold tracking-tight sm:text-3xl">
                Welcome Back
              </h1>
              <p className="text-md text-muted-foreground">
                Enter your credentials to manage your digital echoes.
              </p>
            </header>
            <SignInForm setRequireOtp={setRequireOtp} setEmail={setEmail}/>
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="border-outline-variant/20 w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs tracking-widest uppercase">
                <span className="bg-[#0f1930] px-4">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={"outline"}
                className="w-fulll h-11! bg-background!"
                size={"lg"}
              >
                <span className="font-label text-sm font-semibold">Google</span>
              </Button>
              <Button
                variant={"outline"}
                className="w-fulll h-11! bg-background!"
                size={"lg"}
              >
                <span className="font-label text-sm font-semibold">Github</span>
              </Button>
            </div>
            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground">
                You don't have account?
                <a
                  className="ml-1 font-bold text-primary underline-offset-4 hover:underline"
                  href="/signup"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <OtpForm email={email} />
      )}
    </div>
  )
}

export default SignInSection

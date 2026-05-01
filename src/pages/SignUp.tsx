import SignUpForm from "@/components/forms/SignUpForm";
import {
  FolderArchiveIcon,
  GaugeIcon,
  ShieldCheckIcon,
  TrendingUpDownIcon,
} from "lucide-react";

const SignUp = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[100px]"></div>
        <div
          className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(#69f6b8 0.5px, transparent 0.5px)",
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      <main className="z-10 w-full max-w-xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
              <FolderArchiveIcon className="text-primary" />
            </div>
            <span className="brand-font text-on-surface text-3xl font-extrabold tracking-tighter">
              ZipUrl
            </span>
          </div>
          <p className="max-w-sm text-base tracking-tight text-muted-foreground">
            Join the ecosystem of bioluminescent intelligence.
          </p>
        </div>
        <section className="rounded-[2rem] border border-secondary/40 bg-background p-8 shadow-2xl md:p-12">
          <header className="mb-10">
            <h1 className="mb-2 text-xl sm:text-3xl font-bold tracking-tight">
              Create a new account.
            </h1>
            <p className="text-md text-muted-foreground">
              Enter your credentials to manage your digital echoes.
            </p>
          </header>
          <SignUpForm />
          <div className="mt-10 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?
              <a
                className="ml-1 font-bold text-primary hover:underline"
                href="/sign-in"
              >
                Sign in
              </a>
            </p>
          </div>
        </section>
        <div className="mt-8 grid grid-cols-3 gap-4 opacity-50 grayscale transition-all duration-500 hover:grayscale-0">
          <div className="flex flex-col items-center gap-1">
            <ShieldCheckIcon size={18} />
            <span className="font-label text-[10px] tracking-widest uppercase">
              AES-256
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <GaugeIcon size={18} />
            <span className="font-label text-[10px] tracking-widest uppercase">
              Global Edge
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <TrendingUpDownIcon />
            <span className="font-label text-[10px] tracking-widest uppercase">
              Real-time
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;

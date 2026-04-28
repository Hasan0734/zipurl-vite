import {
  ChartNoAxesCombined,
  FolderArchiveIcon,
  Gauge,
  ShieldCogCorner,
} from "lucide-react"
import SignInSection from "../components/SignInSection";

const SignIn = () => {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden">
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
      <main className="relative z-10 flex w-full max-w-6xl flex-col items-center px-6 py-12">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
              <FolderArchiveIcon className="text-primary" />
            </div>
            <span className="text-3xl font-extrabold tracking-tighter">
              ZipUrl
            </span>
          </div>
          <p className="text-xs font-medium tracking-[0.2em] uppercase">
            Bioluminescent Intelligence
          </p>
        </div>
        <SignInSection />
        <div className="mt-12 flex items-center gap-12 opacity-40 grayscale transition-all duration-500 hover:grayscale-0">
          <div className="flex items-center gap-2">
            <ShieldCogCorner size={16} />
            <span className="font-label text-[10px] tracking-widest uppercase">
              End-to-End Encryption
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge size={16} />
            <span className="font-label text-[10px] tracking-widest uppercase">
              Millisecond Latency
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ChartNoAxesCombined size={16} />
            <span className="font-label text-[10px] tracking-widest uppercase">
              Real-time Analytics
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;

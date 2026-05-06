import { type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import LogoHeader from "./LogoHeader";
import { cn } from "@/lib/utils";

interface Tags {
  icon: LucideIcon;
  label: string;
}

interface AuthFormLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  tags?: Tags[];
  formAreaClass?: string;
  containerClass?: string;
}

const AuthFormLayout = ({
  children,
  title,
  description,
  tags,
  formAreaClass,
  containerClass,
}: AuthFormLayoutProps) => {
  console.log(tags);
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

      <main className={containerClass}>
        <LogoHeader />
        <section
          className={cn(
            "glass-card emerald-glow w-full max-w-120 rounded-[2rem] bg-background! p-10 md:p-12",
            formAreaClass,
          )}
        >
          {(title || description) && (
            <header className="mb-10">
              <h1 className="mb-2 text-xl sm:text-3xl font-bold tracking-tight">
                {title}
              </h1>
              <p className="text-md text-muted-foreground">{description}</p>
            </header>
          )}
          {children}
        </section>
        <div className="mt-8 grid grid-cols-3 gap-4 opacity-50 grayscale transition-all duration-500 hover:grayscale-0">
          {tags && tags?.length > 0
            ? tags.map((tag) => (
                <div className="flex flex-col items-center gap-1">
                  <tag.icon size={18} />
                  <span className="font-label text-[10px] tracking-widest uppercase">
                    {tag.label}
                  </span>
                </div>
              ))
            : null}
        </div>
      </main>
    </div>
  );
};

export default AuthFormLayout;

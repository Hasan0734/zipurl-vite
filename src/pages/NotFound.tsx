import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="relative flex w-full min-h-screen items-center justify-center overflow-hidden py-10">
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

      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 glass-card emerald-glow w-full max-w-122 rounded-[2rem] bg-background! p-10 md:p-12">
        <div className="text-center">
          <p className="text-xl font-semibold text-white">404</p>
          <h1 className="mt-4 text-xl font-semibold tracking-tight text-balance text-white sm:text-3xl">
            Page not found
          </h1>
          <p className="mt-6 text-base font-medium text-pretty text-gray-400 ">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;

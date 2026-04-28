import { Link2 } from "lucide-react"

const PastLink = () => {
  return (
    <section className="max-w-4xl">
      <div className="mb-4">
        <h2 className=" text-4xl font-black tracking-tighter">
          Light up your links.
        </h2>
        <p className=" mt-2 font-bold tracking-widest text-primary/60 ">
          Instant Shortening
        </p>
      </div>
      <div className="glass-panel flex items-center gap-2 rounded-2xl p-2 shadow-2xl">
        <div className="flex flex-1 items-center gap-3 px-4">
         <Link2 className="text-primary"/>
          <input
            className=" w-full border-none py-4 focus:ring-0 outline-0"
            placeholder="Paste your long URL here..."
            type="text"
          />
        </div>
        <button className="bg-primary rounded-xl px-8 py-4 font-black transition-transform hover:scale-[1.02] active:scale-95">
          Shortner
        </button>
      </div>
    </section>
  )
}

export default PastLink

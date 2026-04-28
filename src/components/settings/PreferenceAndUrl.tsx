import { BadgeCheck, SlidersHorizontal } from "lucide-react"
import { Button } from "../ui/button"

const PreferenceAndUrl = () => {
  return (
    <section className="glass-card rounded-3xl border-primary/10 p-8">
      <h3 className="font-headline mb-8 flex items-center gap-3 text-xl font-bold">
        <SlidersHorizontal className="text-primary" />
        URL Preferences
      </h3>
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className=" text-[10px] tracking-widest uppercase">
              Default Link Expiry
            </label>
            <span className="text-xs font-bold text-primary">30 Days</span>
          </div>
          <input
           onChange={(e) => console.log(e.target.value)}
            className="bg-background h-1.5 w-full cursor-pointer appearance-none rounded-lg accent-primary"
            max="365"
            min="1"
            type="range"
            value="30"
          />
          <div className="text-muted-foreground font-label flex justify-between text-[10px]">
            <span>1 DAY</span>
            <span>NEVER</span>
          </div>
        </div>
        <div className="space-y-3">
          <label className="font-headline text-on-surface-variant text-[10px] tracking-widest uppercase">
            Custom Root Domain
          </label>
          <div className="relative">
            <input
              onChange={(e) => console.log(e.target.value)}
              className="bg-background/50 border-background/10 font-body w-full rounded-xl border px-4 py-3 text-sm transition-all outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              type="text"
              value="lnk.lumos.tech"
            />
            <span
              className=" absolute top-3 right-3 text-sm text-primary"
            >
              <BadgeCheck/>
            </span>
          </div>
          <p className="text-muted-foreground text-[10px] italic">
            Domain propagation completed successfully.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6">
          <h4 className="font-headline mb-3 text-xs font-extrabold tracking-widest text-primary uppercase">
            API Integration
          </h4>
          <p className="text-muted-foreground mb-4 text-xs leading-relaxed">
            Connect your shortening engine to third-party bioluminescent nodes.
          </p>
          <div className="flex gap-2">
            <Button variant={'outline'} size={'lg'} className="">Generate Key</Button>
            <Button variant={'outline'} size={'lg'} className="">Docs</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PreferenceAndUrl

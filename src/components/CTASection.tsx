import React from "react"

const CTASection = () => {
  return (
    <section className="relative overflow-hidden px-6 py-24" id="ready_to_start">
      <div className="absolute inset-0 z-0 bg-primary/5"></div>
      <div className="bg-glass relative z-10 mx-auto max-w-5xl overflow-hidden rounded-xl border border-primary/20 p-12 text-center shadow-[0_0_80px_rgba(16,185,129,0.1)] md:p-20">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-secondary/10 blur-[80px]"></div>
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-[80px]"></div>
        <h2 className=" mb-8 text-4xl leading-tight font-extrabold tracking-tighter md:text-6xl">
          Ready to start <br className="hidden md:block" />
          <span className="text-secondary">shortening?</span>
        </h2>
        <p className=" mx-auto mb-12 max-w-2xl text-xl font-medium">
          Join over 50,000 users who are already scaling their reach with
          LumeShort's powerful link management platform.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="cta-gradient text-on-primary rounded-md px-10 py-5 text-lg font-bold shadow-xl shadow-primary/30 transition-all hover:scale-[1.05] active:scale-95">
            Create Free Account
          </button>
          <button className="bg-surface-variant text-on-surface hover:bg-surface-bright border-outline-variant/20 rounded-md border px-10 py-5 text-lg font-bold transition-all">
            View Pricing
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTASection

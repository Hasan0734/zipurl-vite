import { CheckCircle } from "lucide-react"
import React from "react"

const PricingSection = () => {
  return (
    <section className="relative overflow-hidden px-6 py-24" id="pricing">
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"></div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <h2 className="text-on-surface mb-4 text-4xl font-extrabold md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-on-surface-variant text-lg">
            Choose the perfect plan for your link management needs.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-surface-container-low border-outline-variant/10 pricing-card-hover rounded-xl border p-8 transition-all duration-300">
            <h3 className="text-on-surface mb-2 text-xl font-bold">Free</h3>
            <p className="text-on-surface-variant mb-6 text-sm">
              Perfect for individuals
            </p>
            <div className="mb-8">
              <span className="text-on-surface text-4xl font-extrabold">
                $0
              </span>
              <span className="text-on-surface-variant">/mo</span>
            </div>
            <ul className="mb-10 space-y-4">
              <li className="text-on-surface-variant flex items-center gap-3 text-sm">
                <CheckCircle className="text-primary" size={18} />
                50 Links / month
              </li>
              <li className="text-on-surface-variant flex items-center gap-3 text-sm">
                <CheckCircle className="text-primary" size={18} />
                Basic Analytics
              </li>
              <li className="text-on-surface-variant flex items-center gap-3 text-sm">
                <CheckCircle className="text-primary" size={18} />
                Community Support
              </li>
            </ul>
            <button className="border-outline-variant/30 text-on-surface hover:bg-surface-variant w-full rounded-md border py-4 font-bold transition-colors">
              Get Started
            </button>
          </div>
          <div className="bg-surface-variant/40 pricing-card-hover relative rounded-xl border-2 border-primary/50 p-8 backdrop-blur-xl transition-all duration-300">
            <div className="text-on-primary absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] font-black tracking-widest uppercase">
              Most Popular
            </div>
            <h3 className="text-on-surface mb-2 text-xl font-bold">Pro</h3>
            <p className="text-on-surface-variant mb-6 text-sm">
              For growing brands
            </p>
            <div className="mb-8">
              <span className="text-on-surface text-4xl font-extrabold">
                $29
              </span>
              <span className="text-on-surface-variant">/mo</span>
            </div>
            <ul className="mb-10 space-y-4">
              <li className="text-on-surface-variant flex items-center gap-3 text-sm">
                <CheckCircle className="text-primary" size={18} />
                Unlimited Links
              </li>
              <li className="text-on-surface-variant flex items-center gap-3 text-sm">
                <CheckCircle className="text-primary" size={18} />
                Advanced Analytics
              </li>
              <li className="text-on-surface-variant flex items-center gap-3 text-sm">
                <CheckCircle className="text-primary" size={18} />
                Custom Domains
              </li>
              <li className="text-on-surface-variant flex items-center gap-3 text-sm">
                <CheckCircle className="text-primary" size={18} />
                Priority Email Support
              </li>
            </ul>
            <button className="cta-gradient text-on-primary w-full rounded-md py-4 font-bold shadow-lg shadow-primary/20">
              Go Pro Now
            </button>
          </div>
          <div className="bg-surface-container-low border-outline-variant/10 pricing-card-hover rounded-xl border p-8 transition-all duration-300">
            <h3 className="text-on-surface mb-2 text-xl font-bold">
              Enterprise
            </h3>
            <p className="text-on-surface-variant mb-6 text-sm">
              Large scale solutions
            </p>
            <div className="mb-8">
              <span className="text-on-surface text-4xl font-extrabold">
                Custom
              </span>
            </div>
            <ul className="mb-10 space-y-4">
              <li className="text-on-surface-variant flex items-center gap-3 text-sm">
                <CheckCircle className="text-primary" size={18} />
                Full API Access
              </li>
              <li className="text-on-surface-variant flex items-center gap-3 text-sm">
                <CheckCircle className="text-primary" size={18} />
                SLA &amp; Dedicated Rep
              </li>
              <li className="text-on-surface-variant flex items-center gap-3 text-sm">
                <CheckCircle className="text-primary" size={18} />
                Custom Security Policies
              </li>
              <li className="text-on-surface-variant flex items-center gap-3 text-sm">
                <CheckCircle className="text-primary" size={18} />
                24/7 Phone Support
              </li>
            </ul>
            <button className="border-outline-variant/30 text-on-surface hover:bg-surface-variant w-full rounded-md border py-4 font-bold transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection

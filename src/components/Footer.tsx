import { Globe, MessageSquareMore, Terminal, WholeWord } from "lucide-react"
import React from "react"

const Footer = () => {
  return (
    <footer className="bg-[#091328] px-12 py-16">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-12 md:flex-row">
        <div className="max-w-xs">
          <span className="mb-6 block text-2xl font-black tracking-tighter text-[#dee5ff]">
            ZipUrl
          </span>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Illuminating the path between your content and your audience through
            intelligent link management.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12 md:grid-cols-3">
          <div>
            <h4 className="text-on-surface mb-4 font-bold">Product</h4>
            <ul className="text-on-surface-variant space-y-2 text-sm">
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  Features
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  API Reference
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="mb-4 font-bold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-outline-variant/10 mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
        <p className="text-on-surface-variant text-xs">
          © 2024 Luminous Logic Inc. All rights reserved.
        </p>
        <div className="flex gap-6">
          <span
            className="cursor-pointer transition-colors hover:text-primary"
            data-icon="public"
          >
            <Globe />
          </span>
          <span
            className="text-on-surface-variant cursor-pointer transition-colors hover:text-primary"
            data-icon="chat"
          >
            <MessageSquareMore />
          </span>
          <span
            className="text-on-surface-variant cursor-pointer transition-colors hover:text-primary"
            data-icon="terminal"
          >
            <Terminal />
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

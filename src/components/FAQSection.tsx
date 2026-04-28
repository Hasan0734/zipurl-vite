import { ChevronDown } from "lucide-react"
import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

const FAQSection = () => {
  return (
    <section className="px-6 py-24" id="FAQ">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-extrabold">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers.
          </p>
        </div>
          <Accordion type="single" collapsible className="max-w-lg mx-auto space-y-4">
            <AccordionItem value="custom_domain" className="border-b-0! bg-primary/10 rounded-md px-3">
              <AccordionTrigger className="">
                Can I use my own custom domain?
              </AccordionTrigger>
              <AccordionContent>
                Yes! With our Pro and Enterprise plans, you can connect your own
                custom domain (e.g., links.yourbrand.com) to create fully
                branded short links.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="secure_shortened" className="border-b-0! bg-primary/10 rounded-md px-3">
              <AccordionTrigger>
                How secure are the shortened links?
              </AccordionTrigger>
              <AccordionContent>
                Extremely secure. All links are served via HTTPS, and we employ
                enterprise-grade encryption. We also monitor for malicious URLs
                to ensure your audience is always safe.
              </AccordionContent>
            </AccordionItem>


            <AccordionItem value="limit_click" className="border-b-0! bg-primary/10 rounded-md px-3">
              <AccordionTrigger>
                Is there a limit to how many clicks a link can get?
              </AccordionTrigger>
              <AccordionContent>
                No, we do not limit the number of clicks on your shortened
                links. Whether you have 10 clicks or 10 million, your links will
                remain active.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="developers" className="border-b-0! bg-primary/10 rounded-md px-3">
              <AccordionTrigger>
                Do you offer API access for developers?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely. We provide a robust REST API that allows you to
                shorten links, manage aliases, and retrieve analytics
                programmatically. Check out our documentation for more details.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
      </div>
    </section>
  )
}

export default FAQSection

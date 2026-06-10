import type { Metadata } from "next";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/Motion";
import Section from "@/components/Section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description: "Request a catering quote from Rumi's Boutique Catering in Toronto."
};

export default function ContactPage() {
  return (
    <main className="bg-atelier pt-28">
      <Section className="pt-16 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <Reveal>
            <h1 className="text-balance font-serif text-5xl font-semibold leading-tight text-white sm:text-6xl md:text-7xl">
              Request a Quote
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Tell Rumi's about the date, guest count, event style, and any menu details you already have in mind.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="rounded-[8px] border border-gold/20 bg-plum p-6 text-white shadow-petal lg:sticky lg:top-28">
              <p className="font-serif text-4xl font-semibold">Start the conversation</p>
              <div className="mt-7 grid gap-4">
                <a href={site.phoneHref} className="flex items-center gap-3 rounded-[8px] bg-white/8 p-4 hover:bg-white/12">
                  <Phone className="size-5 text-lilac" />
                  <span>{site.phone}</span>
                </a>
                <a href={site.emailHref} className="flex items-center gap-3 rounded-[8px] bg-white/8 p-4 hover:bg-white/12">
                  <Mail className="size-5 text-lilac" />
                  <span>{site.email}</span>
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-[8px] bg-white/8 p-4 hover:bg-white/12"
                >
                  <Instagram className="size-5 text-lilac" />
                  <span>Instagram</span>
                </a>
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-[8px] bg-white/8 p-4 hover:bg-white/12"
                >
                  <Facebook className="size-5 text-lilac" />
                  <span>Facebook</span>
                </a>
              </div>
              <div className="mt-8 h-px bg-gold/40" />
              <p className="mt-6 text-sm leading-6 text-white/68">
                Personal details are submitted by POST only and are never placed in URL query strings.
              </p>
            </aside>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}

import type { Metadata } from "next";
import EventBuilder from "@/components/event-builder/EventBuilder";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Menu & Event Builder",
  description:
    "Build a High Tea or Cocktail Party quote request with menu favorites, three tea selections, guest count, staffing, and a live estimate."
};

export default function MenuPage() {
  return (
    <main className="bg-paper pt-28">
      <Section className="pb-10 pt-16 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance font-serif text-5xl font-semibold leading-tight sm:text-6xl md:text-7xl">
            Build your event
          </h1>
          <p className="mt-5 text-lg leading-8 text-plum/68">
            Assemble a custom catering request for High Tea or Cocktail Party service. This is a quote flow, not checkout:
            no payment is collected here.
          </p>
        </div>
      </Section>
      <Section className="pt-6">
        <EventBuilder />
      </Section>
    </main>
  );
}

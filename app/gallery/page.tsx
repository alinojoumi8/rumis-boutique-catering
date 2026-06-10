import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Food and event photography placeholders for Rumi's Boutique Catering."
};

export default function GalleryPage() {
  return (
    <main className="bg-ink pt-28 text-white">
      <Section className="pb-10 pt-16 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance font-serif text-5xl font-semibold leading-tight sm:text-6xl md:text-7xl">
            Gallery
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/68">
            Placeholder food and event images with the exact caption list ready for the owner's final photography.
          </p>
        </div>
      </Section>
      <Section className="pt-6">
        <GalleryGrid />
      </Section>
    </main>
  );
}

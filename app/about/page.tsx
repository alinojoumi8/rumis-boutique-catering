import type { Metadata } from "next";
import Image from "next/image";
import TeaScene from "@/components/3d/LazyTeaScene";
import { Reveal } from "@/components/Motion";
import Section from "@/components/Section";
import { includedItems, missionCopy } from "@/data/site";
import { imagePath } from "@/lib/image-path";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Rumi's Boutique Catering, full-service High Tea and Cocktail Party catering, and Certified Tea Sommelier pairings."
};

export default function AboutPage() {
  return (
    <main className="bg-ivory pt-28">
      <Section className="pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <Reveal>
            <h1 className="text-balance font-serif text-5xl font-semibold leading-tight sm:text-6xl md:text-7xl">
              About Rumi's
            </h1>
            <p className="mt-6 text-lg leading-8 text-plum/70">{missionCopy}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] shadow-petal">
              <Image
                src={imagePath("/images/atelier-table.png")}
                alt="High tea table with vintage china and flowers"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-atelier text-white">
        <div className="grid gap-10 md:grid-cols-[1fr_0.75fr] md:items-center">
          <Reveal>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-lilac">Certified Tea Sommelier</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight md:text-6xl">
              A more thoughtful way to serve tea.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              Rumi's differentiator is a Certified Tea Sommelier who pairs teas to the menu. The result is a service that
              feels composed from the first savoury bite through the final pastry.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-80 overflow-hidden rounded-[8px] border border-gold/30 bg-ink shadow-petal">
              <TeaScene className="absolute inset-0" />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-porcelain">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-5xl font-semibold md:text-6xl">What's included</h2>
          <p className="mt-4 text-lg text-plum/68">
            Full-service details help the event feel finished before guests arrive and after they leave.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {includedItems.map((item, index) => (
            <Reveal key={item} delay={(index % 5) * 0.04}>
              <div className="rounded-[8px] border border-gold/20 bg-ivory p-5 text-center font-bold capitalize text-plum/74">
                {item}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}

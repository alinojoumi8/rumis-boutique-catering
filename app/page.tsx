import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TeaScene from "@/components/3d/LazyTeaScene";
import GalleryGrid from "@/components/GalleryGrid";
import { FadeIn, Reveal } from "@/components/Motion";
import Section from "@/components/Section";
import { missionCopy, packages, site } from "@/data/site";
import { imagePath } from "@/lib/image-path";

export default function HomePage() {
  return (
    <main>
      <section className="relative min-h-screen overflow-hidden bg-plum text-white">
        <Image
          src={imagePath("/images/high-tea-hero.png")}
          alt="Elegant high tea table with vintage china, pastries, canapés, and flowers"
          fill
          priority
          sizes="100vw"
          className="object-cover motion-safe:animate-[float_16s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-plum/82 via-plum/42 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-plum/50 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-20 pt-32 md:px-8">
          <FadeIn className="max-w-3xl">
            <h1 className="max-w-[11ch] text-balance font-serif text-5xl font-semibold leading-[0.98] sm:text-6xl md:max-w-none md:text-8xl">
              {site.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg font-semibold text-white/84 md:text-2xl">{site.tagline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-extrabold text-plum shadow-float transition hover:bg-lilac"
              >
                Build Your Event
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/45 px-7 py-4 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                Request a Quote
              </Link>
            </div>
          </FadeIn>
          <TeaScene className="pointer-events-none absolute bottom-28 right-3 h-20 w-20 opacity-90 md:bottom-20 md:right-12 md:h-80 md:w-80" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-ivory px-5 py-5 text-plum md:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <p className="font-serif text-2xl font-semibold">Custom high tea, cocktail bites, and sommelier tea pairings.</p>
            <span className="hidden h-px flex-1 bg-gold/40 md:block" />
          </div>
        </div>
      </section>

      <Section className="bg-ivory">
        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <Reveal>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-mulberry">Toronto boutique catering</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight md:text-6xl">
              Elegant service for gatherings that should feel personal.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-8 text-plum/70">{missionCopy}</p>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-mulberry">
              Learn about Rumi's
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-porcelain" innerClassName="grid gap-8">
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-5xl font-semibold md:text-6xl">Signature services</h2>
          <p className="mt-4 text-lg text-plum/68">Two focused formats, both customized for the event.</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {packages.map((eventPackage, index) => (
            <Reveal key={eventPackage.id} delay={index * 0.08}>
              <Link
                href="/menu"
                className="group block overflow-hidden rounded-[8px] border border-gold/20 bg-ivory shadow-sm transition hover:-translate-y-1 hover:shadow-float"
              >
                <div className="relative h-80">
                  <Image
                    src={imagePath(
                      eventPackage.id === "high-tea" ? "/images/high-tea-detail.png" : "/images/cocktail-canapes.png"
                    )}
                    alt={`${eventPackage.name} placeholder catering image`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-4xl font-semibold">{eventPackage.name}</h3>
                  <p className="mt-3 text-plum/68">{eventPackage.shortDescription}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-mulberry">
                    See the menu
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-lilac/45">
        <div className="grid gap-10 md:grid-cols-[1fr_0.75fr] md:items-center">
          <Reveal>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-mulberry">Certified Tea Sommelier</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight md:text-6xl">
              Tea pairings are part of the menu, not an afterthought.
            </h2>
            <p className="mt-5 text-lg leading-8 text-plum/72">
              Rumi's pairs three teas to the food menu so every service has a graceful progression from savoury bites to
              sweets.
            </p>
            <Link href="/menu" className="mt-8 inline-flex items-center gap-2 rounded-full bg-plum px-7 py-4 text-sm font-extrabold text-white">
              Choose your teas
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-80 overflow-hidden rounded-[8px] border border-gold/20 bg-plum shadow-petal">
              <TeaScene className="absolute inset-0" />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-ivory">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="font-serif text-5xl font-semibold md:text-6xl">Gallery preview</h2>
            <p className="mt-3 text-plum/66">Owner-swappable placeholders for food and event photography.</p>
          </Reveal>
          <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-extrabold text-mulberry">
            View gallery
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <GalleryGrid preview />
      </Section>

      <Section className="bg-porcelain">
        <Reveal className="text-center">
          <h2 className="font-serif text-5xl font-semibold md:text-6xl">Customer Reviews</h2>
          <p className="mt-3 text-plum/64">Placeholder cards for the owner to replace with real client reviews.</p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Reveal key={item} delay={item * 0.08}>
              <article className="rounded-[8px] border border-gold/20 bg-ivory p-6">
                <p className="font-serif text-2xl font-semibold">Customer Review</p>
                <p className="mt-4 text-plum/62">Owner can add a client quote here.</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-plum text-white">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-serif text-5xl font-semibold md:text-6xl">Let's talk menus</p>
            <p className="mt-4 max-w-2xl text-white/72">Share the date, guest count, and style of event. Rumi's will shape the quote from there.</p>
          </div>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-extrabold text-plum">
            Request a Quote
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
    </main>
  );
}

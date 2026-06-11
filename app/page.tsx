import { ArrowRight, Compass, Leaf, MapPin, Sparkles, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TeaScene from "@/components/3d/LazyTeaScene";
import GalleryGrid from "@/components/GalleryGrid";
import { FadeIn, Reveal } from "@/components/Motion";
import Section from "@/components/Section";
import { missionCopy, packages, pricing, site, teas } from "@/data/site";
import { formatCurrency } from "@/lib/estimate";
import { imagePath } from "@/lib/image-path";

export default function HomePage() {
  return (
    <main className="bg-ink text-white">
      <section className="atelier-noise relative min-h-screen overflow-hidden bg-atelier">
        <Image
          src={imagePath("/images/atelier-hero-3d-stage.png")}
          alt="Cinematic high tea catering table with pastries, florals, candlelight, and space for an animated teacup"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-82"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,rgba(238,206,248,0.12),transparent_24%),linear-gradient(90deg,rgba(23,16,24,0.95)_0%,rgba(23,16,24,0.76)_42%,rgba(23,16,24,0.34)_100%)]" />
        <div className="absolute right-[11%] top-[18%] hidden h-[34rem] w-[34rem] rounded-full border border-gold/25 bg-white/[0.015] backdrop-blur-[1px] md:block" />
        <span className="petal-orbit absolute right-[27%] top-[20%] hidden size-5 rounded-full bg-lilac/80 blur-[1px] md:block" />
        <span className="petal-orbit absolute right-[10%] top-[49%] hidden size-3 rounded-full bg-champagne/80 blur-[1px] [animation-delay:1.7s] md:block" />

        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-24 pt-32 md:grid-cols-[0.78fr_0.82fr] md:px-8 lg:grid-cols-[0.88fr_0.72fr]">
          <FadeIn>
            <div className="flex items-center gap-3 text-sm font-extrabold text-champagne">
              <MapPin className="size-4" />
              <span>Proudly serving Toronto and the GTA</span>
            </div>
            <h1 className="gold-thread mt-7 max-w-[10ch] text-balance font-serif text-6xl font-semibold leading-[0.92] sm:text-7xl md:text-8xl">
              {site.name}
            </h1>
            <p className="mt-8 max-w-xl text-xl font-semibold text-white/82 md:text-2xl">{site.tagline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-lilac px-7 py-4 text-sm font-extrabold text-plum shadow-float transition hover:-translate-y-0.5 hover:bg-white"
              >
                Build Your Event
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-gold/60 px-7 py-4 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                Request a Quote
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn className="relative min-h-[340px] sm:min-h-[420px] md:min-h-[600px]">
            <div className="absolute inset-x-4 bottom-10 top-6 rounded-full border border-gold/25 bg-ink/10 shadow-[inset_0_0_80px_rgba(238,206,248,0.08)] md:inset-x-0 md:bottom-12 md:top-4" />
            <TeaScene className="absolute inset-0" />
            <div className="absolute bottom-8 left-4 max-w-xs rounded-[8px] border border-gold/28 bg-ink/90 p-5 shadow-petal backdrop-blur-md md:bottom-14 md:left-0">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-lilac">Sommelier pairing</p>
              <p className="mt-2 text-white/72">Three teas curated around the menu, service style, and sweets.</p>
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-gold/20 bg-ink/88 px-5 py-5 backdrop-blur-md md:px-8">
          <div className="mx-auto grid max-w-7xl gap-3 text-sm font-bold text-white/78 md:grid-cols-3">
            <span className="flex items-center gap-2">
              <Sparkles className="size-4 text-lilac" />
              Vintage china and full setup
            </span>
            <span className="flex items-center gap-2">
              <Leaf className="size-4 text-champagne" />
              Certified Tea Sommelier
            </span>
            <span className="flex items-center gap-2">
              <Utensils className="size-4 text-lilac" />
              High Tea and Cocktail Parties
            </span>
          </div>
        </div>
      </section>

      <Section className="bg-ivory text-plum" innerClassName="grid gap-0 overflow-hidden rounded-[8px] border border-gold/20 bg-porcelain shadow-petal md:grid-cols-2">
        <Reveal className="p-8 md:p-14">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-mulberry">Every detail, beautifully curated</p>
          <h2 className="mt-5 max-w-lg font-serif text-5xl font-semibold leading-tight md:text-6xl">
            Catering with the pace and poise of a private atelier.
          </h2>
          <div className="my-8 h-px max-w-xs bg-gold/55" />
          <p className="text-lg leading-8 text-plum/70">{missionCopy}</p>
          <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-mulberry">
            Our story
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative min-h-[420px]">
            <Image
              src={imagePath("/images/atelier-table.png")}
              alt="Overhead catering table with high tea, cocktail drinks, flowers, and vintage china"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </Section>

      <section className="grid md:grid-cols-2">
        {packages.map((eventPackage, index) => (
          <Reveal key={eventPackage.id}>
            <Link
              href="/menu"
              className={`group relative block min-h-[620px] overflow-hidden px-5 py-16 text-white md:px-10 lg:px-16 ${
                eventPackage.id === "high-tea" ? "bg-aubergine" : "bg-herb"
              }`}
            >
              <Image
                src={imagePath(eventPackage.id === "high-tea" ? "/images/atelier-table.png" : "/images/cocktail-canapes.png")}
                alt={`${eventPackage.name} catering service`}
                fill
                sizes="50vw"
                className="object-cover opacity-48 transition duration-700 group-hover:scale-105"
                style={{ objectPosition: eventPackage.id === "high-tea" ? "52% center" : "center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/44 to-transparent" />
              <div className="relative z-10 flex min-h-[500px] flex-col justify-end">
                <div className="mb-8 grid size-16 place-items-center rounded-full border border-gold/50 bg-ink/40 text-champagne">
                  {index === 0 ? <Leaf className="size-7" /> : <Compass className="size-7" />}
                </div>
                <h2 className="font-serif text-6xl font-semibold">{eventPackage.name}</h2>
                <div className="mt-5 h-px max-w-xs bg-gold/60" />
                <p className="mt-5 max-w-md text-lg leading-8 text-white/74">{eventPackage.shortDescription}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-lilac">
                  Explore {eventPackage.name}
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <Section className="bg-lilac text-plum">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.1fr_0.7fr] md:items-center">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-full border border-gold/30 bg-porcelain shadow-petal">
              <Image
                src={imagePath("/images/atelier-hero.png")}
                alt="Tea cup with steam and boutique catering table"
                fill
                sizes="(min-width: 768px) 28vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-mulberry">Certified Tea Sommelier</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight md:text-6xl">
              Tea is treated like a course.
            </h2>
            <p className="mt-5 text-lg leading-8 text-plum/72">
              Darjeeling, Rumi's Special Blend, Tie Guan Yin, Long Jing, Moroccan Mint, and Cinnamon become a curated
              pairing moment instead of a beverage afterthought.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="rounded-[8px] border border-gold/30 bg-porcelain/75 p-5">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-mulberry">Tea menu</p>
              <div className="mt-4 grid gap-2 text-sm font-bold text-plum/70">
                {teas.slice(0, 6).map((tea) => (
                  <span key={tea.id}>{tea.name}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-porcelain text-plum">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:items-center">
          <Reveal>
            <h2 className="font-serif text-5xl font-semibold leading-tight md:text-6xl">
              Build your event your way.
            </h2>
            <p className="mt-5 text-lg leading-8 text-plum/68">
              Choose a package, select menu favorites, pick exactly three teas, add staffing, and submit a booking
              request with a live estimate.
            </p>
            <Link href="/menu" className="mt-8 inline-flex items-center gap-2 rounded-[8px] bg-plum px-7 py-4 text-sm font-extrabold text-white">
              Start building
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-[8px] border border-gold/25 bg-white shadow-petal">
              <div className="grid grid-cols-5 border-b border-gold/20 text-center text-xs font-extrabold uppercase tracking-[0.12em] text-plum/52">
                {["Package", "Menu", "3 Teas", "Guests", "Estimate"].map((step) => (
                  <div key={step} className="border-r border-gold/20 px-3 py-4 last:border-r-0">
                    {step}
                  </div>
                ))}
              </div>
              <div className="p-5">
                <p className="font-serif text-3xl font-semibold">Select exactly three teas</p>
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {teas.slice(0, 6).map((tea, index) => (
                    <div
                      key={tea.id}
                      className={`rounded-[8px] border p-4 ${
                        index === 0 || index === 1 || index === 4
                          ? "border-mulberry bg-lilac/35"
                          : "border-gold/20 bg-ivory"
                      }`}
                    >
                      <p className="font-bold">{tea.name}</p>
                      <p className="mt-2 text-xs text-plum/55">{tea.note ?? "Sommelier selected"}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 border-t border-gold/20 pt-5 text-sm font-bold text-plum/68 sm:flex-row sm:items-center sm:justify-between">
                  <span>Guests {pricing.minimumGuests}</span>
                  <span>Estimate {formatCurrency(pricing.minimumGuests * pricing.perPerson)}</span>
                  <span className="text-mulberry">Continue building</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-ink text-white">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="font-serif text-5xl font-semibold md:text-6xl">A glimpse into our world</h2>
            <p className="mt-3 text-white/62">Food, flowers, porcelain, and the moments around the table.</p>
          </Reveal>
          <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-extrabold text-lilac">
            View full gallery
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <GalleryGrid preview />
      </Section>

      <Section className="bg-ivory text-plum">
        <Reveal className="text-center">
          <h2 className="font-serif text-5xl font-semibold md:text-6xl">Kind Words</h2>
          <p className="mt-3 text-plum/64">Placeholder cards for real client reviews.</p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Reveal key={item} delay={item * 0.08}>
              <article className="rounded-[8px] border border-gold/20 bg-porcelain p-6 shadow-sm">
                <p className="font-serif text-5xl leading-none text-lilac">“</p>
                <p className="mt-2 text-plum/62">Owner can add a client quote here.</p>
                <p className="mt-5 text-sm font-extrabold text-mulberry">Client Name</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-atelier text-white">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-serif text-5xl font-semibold md:text-6xl">Let's create something beautiful.</p>
            <p className="mt-4 max-w-2xl text-white/72">
              Share the date, guest count, and event mood. Rumi's will shape the menu from there.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/menu" className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-lilac px-7 py-4 text-sm font-extrabold text-plum">
              Build Your Event
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-gold/60 px-7 py-4 text-sm font-extrabold text-white">
              Request a Quote
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}

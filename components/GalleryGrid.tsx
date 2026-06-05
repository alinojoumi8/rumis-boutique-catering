"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { galleryCaptions } from "@/data/site";

const imageCycle = [
  "/images/high-tea-detail.png",
  "/images/cocktail-canapes.png",
  "/images/high-tea-hero.png"
];

export default function GalleryGrid({ preview = false }: { preview?: boolean }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const items = useMemo(() => (preview ? galleryCaptions.slice(0, 8) : galleryCaptions), [preview]);

  useEffect(() => {
    if (active === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((value) => (value === null ? value : (value + 1) % items.length));
      if (event.key === "ArrowLeft") {
        setActive((value) => (value === null ? value : (value - 1 + items.length) % items.length));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, items.length]);

  const activeCaption = active !== null ? items[active] : "";

  return (
    <>
      <div className={preview ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-4" : "masonry"}>
        {items.map((caption, index) => {
          const src = imageCycle[index % imageCycle.length];
          const height = [280, 340, 250, 390, 300][index % 5];
          return (
            <motion.button
              type="button"
              key={caption}
              className={`group relative w-full overflow-hidden rounded-[8px] bg-porcelain text-left shadow-float focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mulberry ${
                preview ? "aspect-[4/5]" : "masonry-item"
              }`}
              style={preview ? undefined : { height }}
              onClick={() => setActive(index)}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (index % 6) * 0.04 }}
            >
              <Image
                src={src}
                alt={`${caption} placeholder image`}
                fill
                sizes={preview ? "(min-width: 1024px) 25vw, 50vw" : "(min-width: 1024px) 33vw, 100vw"}
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum/82 to-transparent p-4 pt-14 text-sm font-bold text-white">
                {caption}
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-plum/88 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={activeCaption}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/12 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Close gallery image"
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setActive((active - 1 + items.length) % items.length)}
              className="absolute left-5 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:grid"
              aria-label="Previous gallery image"
            >
              <ChevronLeft className="size-6" />
            </button>
            <motion.figure
              className="relative w-full max-w-5xl overflow-hidden rounded-[8px] bg-porcelain shadow-petal"
              initial={reduced ? false : { y: 20, scale: 0.98 }}
              animate={reduced ? undefined : { y: 0, scale: 1 }}
              exit={reduced ? undefined : { y: 10, scale: 0.99 }}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={imageCycle[active % imageCycle.length]}
                  alt={`${activeCaption} placeholder image`}
                  fill
                  sizes="90vw"
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="flex items-center justify-between gap-4 px-5 py-4">
                <span className="font-serif text-2xl font-semibold text-plum">{activeCaption}</span>
                <span className="text-sm font-bold text-plum/56">Placeholder image</span>
              </figcaption>
            </motion.figure>
            <button
              type="button"
              onClick={() => setActive((active + 1) % items.length)}
              className="absolute right-5 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:grid"
              aria-label="Next gallery image"
            >
              <ChevronRight className="size-6" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

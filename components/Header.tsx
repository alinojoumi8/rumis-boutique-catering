"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const transparent = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent text-white"
          : "border-b border-gold/20 bg-ink/88 text-white shadow-sm backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} home`}>
          <span
            className={`grid size-11 place-items-center rounded-full border text-xl font-semibold transition ${
              transparent ? "border-white/50 bg-white/10" : "border-gold/45 bg-lilac/15 text-lilac"
            }`}
          >
            R
          </span>
          <span className="leading-none">
            <span className="block font-serif text-2xl font-semibold">Rumi's</span>
            <span className={`block text-xs uppercase tracking-[0.16em] ${transparent ? "text-white/78" : "text-white/58"}`}>
              Boutique Catering
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-bold transition hover:text-mulberry focus-visible:rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                  active ? "text-lilac" : transparent ? "text-white/88" : "text-white/74"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/menu"
            className={`rounded-full px-5 py-3 text-sm font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
              transparent
                ? "bg-lilac text-plum shadow-float hover:bg-white"
                : "bg-lilac text-plum shadow-sm hover:bg-white"
            }`}
          >
            Build Your Event
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`grid size-11 place-items-center rounded-full border md:hidden ${
            transparent ? "border-white/50 bg-white/10" : "border-gold/30 bg-white/10"
          }`}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-navigation"
          className="border-t border-gold/20 bg-ink px-5 py-5 text-white shadow-petal md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-base font-bold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lilac"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/menu"
              className="mt-2 rounded-full bg-plum px-5 py-3 text-center text-sm font-extrabold text-white"
            >
              Build Your Event
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

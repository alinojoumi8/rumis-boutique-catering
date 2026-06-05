import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { navItems, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-plum text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:px-8">
        <div>
          <p className="font-serif text-4xl font-semibold">{site.name}</p>
          <p className="mt-3 max-w-md text-white/72">{site.tagline}</p>
          <div className="mt-8 h-px max-w-xs bg-gold/50" />
        </div>

        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-lilac">Visit</p>
          <nav className="mt-4 grid gap-2" aria-label="Footer navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/74 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-lilac">Contact</p>
          <div className="mt-4 grid gap-3 text-white/78">
            <a href={site.phoneHref} className="flex items-center gap-3 transition hover:text-white">
              <Phone className="size-4" />
              {site.phone}
            </a>
            <a href={site.emailHref} className="flex items-center gap-3 transition hover:text-white">
              <Mail className="size-4" />
              {site.email}
            </a>
            <div className="flex gap-3 pt-2">
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="grid size-10 place-items-center rounded-full border border-white/18 transition hover:bg-white/10"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
                className="grid size-10 place-items-center rounded-full border border-white/18 transition hover:bg-white/10"
                aria-label="Facebook"
              >
                <Facebook className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-white/56">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount to catch initial scroll state
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl shadow-soft-sm border-b border-border/40"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <Link
          href="/"
          className={`font-display text-2xl sm:text-3xl tracking-tight hover:opacity-70 transition-all duration-300 hover:scale-[1.02] ${
            isTransparent ? "text-white" : "text-foreground"
          }`}
        >
          Triple W
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm tracking-wide uppercase">
          {[
            { href: "/shop", label: "Shop" },
            { href: "/shop/women", label: "Women" },
            { href: "/shop/men", label: "Men" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`hover-underline transition-colors duration-300 py-1 ${
                  isTransparent
                    ? "text-white/80 hover:text-white"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 rounded-xl hover:bg-surface/20 transition-colors duration-200"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
            } ${isTransparent ? "bg-white" : "bg-foreground"}`}
          />
          <span
            className={`block w-6 h-[1.5px] transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            } ${isTransparent ? "bg-white" : "bg-foreground"}`}
          />
          <span
            className={`block w-6 h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
            } ${isTransparent ? "bg-white" : "bg-foreground"}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl border-t border-border/40">
          <ul className="flex flex-col py-6 px-5 gap-1">
            {[
              { href: "/shop", label: "Shop All" },
              { href: "/shop/women", label: "Women" },
              { href: "/shop/men", label: "Men" },
            ].map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-display text-2xl py-3 px-3 rounded-xl hover:bg-surface transition-all duration-300"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-border/40 pt-3 mt-3">
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="block text-muted hover:text-foreground py-2.5 px-3 rounded-xl hover:bg-surface transition-all duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="block text-muted hover:text-foreground py-2.5 px-3 rounded-xl hover:bg-surface transition-all duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

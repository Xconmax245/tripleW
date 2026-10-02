"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="font-display text-2xl sm:text-3xl tracking-tight hover:opacity-70 transition-opacity duration-200"
        >
          Triple W
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm tracking-wide uppercase">
          <li>
            <Link
              href="/shop"
              className="text-muted hover:text-foreground transition-colors duration-200"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/shop/women"
              className="text-muted hover:text-foreground transition-colors duration-200"
            >
              Women
            </Link>
          </li>
          <li>
            <Link
              href="/shop/men"
              className="text-muted hover:text-foreground transition-colors duration-200"
            >
              Men
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-muted hover:text-foreground transition-colors duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-muted hover:text-foreground transition-colors duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-px bg-foreground transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[4px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-foreground transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-foreground transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[4px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden animate-slide-down border-t border-border bg-background">
          <ul className="flex flex-col py-6 px-5 gap-5 text-lg">
            <li>
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="block font-display text-xl hover:opacity-70 transition-opacity"
              >
                Shop All
              </Link>
            </li>
            <li>
              <Link
                href="/shop/women"
                onClick={() => setMenuOpen(false)}
                className="block font-display text-xl hover:opacity-70 transition-opacity"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                href="/shop/men"
                onClick={() => setMenuOpen(false)}
                className="block font-display text-xl hover:opacity-70 transition-opacity"
              >
                Men
              </Link>
            </li>
            <li className="border-t border-border pt-5 mt-2">
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="block text-muted hover:text-foreground transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="block text-muted hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

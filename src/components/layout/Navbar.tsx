"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, BookOpen } from "lucide-react";
import StreamSwitcher from "@/components/layout/StreamSwitcher";
import { useStream } from "@/components/layout/StreamProvider";

interface DropdownItem {
  label: string;
  href: string;
  desc?: string;
}

const courseLinks: DropdownItem[] = [
  { label: "Foundation", href: "/courses/foundation", desc: "Build your foundation" },
  { label: "Intermediate", href: "/courses/intermediate", desc: "Deepen your knowledge" },
  { label: "Final", href: "/courses/final", desc: "Advanced preparation" },
];

const csCourseLinks: DropdownItem[] = [
  { label: "CSEET", href: "/courses#cseet-foundation", desc: "Start your CS journey" },
  { label: "Executive", href: "/courses#executive", desc: "Build professional knowledge" },
  { label: "Final", href: "/courses#professional", desc: "Advanced preparation" },
];

const resourceLinks: DropdownItem[] = [
  { label: "Foundation Resources", href: "/resources?level=Foundation" },
  { label: "Intermediate Resources", href: "/resources?level=Intermediate" },
  { label: "Final Resources", href: "/resources?level=Final" },
  { label: "Mock Tests & Practice Papers", href: "/resources" },
];

interface NavLink {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const { stream } = useStream();

  const isHome = pathname === "/";
  const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    {
      label: "Courses",
      href: "/courses",
      dropdown: stream === "CA" ? courseLinks : csCourseLinks,
    },
    // { label: "Faculty", href: "/faculty" },
    {
      label: "Free Resources",
      href: "/resources",
      dropdown: resourceLinks,
    },
    { label: "Blog", href: "/blogs" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navBg = isHome && !scrolled
    ? "bg-transparent"
    : "bg-white shadow-sm border-b border-gray-100";

  const textColor = isHome && !scrolled ? "text-white" : "text-navy";
  const linkHoverColor = isHome && !scrolled ? "hover:text-gold-light" : "hover:text-gold";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/logo/dacalogo.png"
                alt="Delhi CA School"
                width={140}
                height={40}
                className="h-10 w-[140px] object-cover"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`nav-link-motion flex items-center gap-1 px-3.5 py-2 rounded-sm text-sm font-medium transition-all duration-200 ${textColor} ${linkHoverColor}`}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.dropdown && activeDropdown === link.label && (
                    <div className="animate-dropdown absolute top-full left-0 pt-2 w-64 z-50">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden py-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-off-white group/item"
                          >
                            <div>
                              <span className="text-navy text-sm font-semibold block group-hover/item:text-navy">
                                {item.label}
                              </span>
                              {item.desc && (
                                <span className="text-muted text-xs mt-0.5 block">
                                  {item.desc}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <StreamSwitcher />
              <Link
                href="/contact"
                className={`text-sm font-medium transition-colors ${textColor} ${linkHoverColor}`}
              >
                Contact
              </Link>
              <Link
                href="/contact#demo"
                className={`btn-gold text-sm px-5 py-2.5 ${
                  isHome && !scrolled ? "" : ""
                }`}
              >
                Book  Free  Demo
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded transition-colors ${textColor}`}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="animate-menu-overlay absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="animate-menu-panel absolute top-0 right-0 bottom-0 w-80 max-w-full bg-white shadow-2xl overflow-y-auto"
            onClick={(event) => {
              if (
                event.target instanceof HTMLElement &&
                event.target.closest("a")
              ) {
                setMobileOpen(false);
                setActiveDropdown(null);
              }
            }}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-navy rounded flex items-center justify-center">
                  <BookOpen size={16} className="text-white" />
                </div>
                <span className="font-playfair font-bold text-navy">Delhi CA School</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-navy p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="py-4 px-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Coaching stream
                </span>
                <StreamSwitcher />
              </div>
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-gray-50 last:border-0">
                  {link.dropdown ? (
                    <>
                      <button
                        aria-expanded={mobileExpanded === link.label}
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === link.label ? null : link.label
                          )
                        }
                        className="flex items-center justify-between w-full py-3.5 text-sm font-semibold text-navy"
                      >
                        {link.label}
                        <ChevronDown
                          size={15}
                          className={`transition-transform text-muted ${
                            mobileExpanded === link.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileExpanded === link.label && (
                        <div className="animate-dropdown pb-3 pl-3">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block py-2.5 text-sm text-navy/70 hover:text-navy transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-3.5 text-sm font-semibold text-navy hover:text-gold transition-colors"
                      aria-current={pathname === link.href ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="mt-6 space-y-3">
                <Link
                  href="/contact#demo"
                  className="btn-gold w-full text-center block"
                >
                  Book Free Demo
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary w-full text-center block"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for non-home pages */}
      {!isHome && <div className="h-[73px]" />}
    </>
  );
}

import Link from "next/link";
import { BookOpen, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const footerLinks = {
  institute: {
    title: "Institute",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Faculty", href: "/faculty" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  courses: {
    title: "Courses",
    links: [
      { label: "CA Foundation", href: "/courses/foundation" },
      { label: "CA Intermediate", href: "/courses/intermediate" },
      { label: "CA Final", href: "/courses/final" },
      { label: "All Courses", href: "/courses" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Free Notes", href: "/resources?type=Notes" },
      { label: "Video Lectures", href: "/resources?type=Video" },
      { label: "Test Papers", href: "/resources?type=Test Paper" },
      { label: "All Resources", href: "/resources" },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded bg-gold/20 border border-gold/40 flex items-center justify-center">
                <BookOpen size={18} className="text-gold-light" />
              </div>
              <div>
                <span className="font-playfair font-bold text-xl text-white block leading-none">
                  CA Excellence
                </span>
                <span className="text-gold text-xs tracking-widest uppercase block mt-0.5">
                  Institute
                </span>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
              A premier CA education institute committed to academic excellence, 
              expert guidance and student success across Foundation, Intermediate 
              and Final levels.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors text-sm group"
              >
                <div className="w-7 h-7 rounded-sm bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <Phone size={13} className="text-gold" />
                </div>
                +91 98765 43210
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors text-sm group"
              >
                <div className="w-7 h-7 rounded-sm bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <MessageCircle size={13} className="text-gold" />
                </div>
                WhatsApp Us
              </a>
              <a
                href="mailto:info@caexcellence.in"
                className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors text-sm group"
              >
                <div className="w-7 h-7 rounded-sm bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <Mail size={13} className="text-gold" />
                </div>
                info@caexcellence.in
              </a>
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <div className="w-7 h-7 rounded-sm bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={13} className="text-gold" />
                </div>
                <span>
                  123 Commerce House, 2nd Floor,<br />
                  Financial District, Your City — 400001
                </span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/55 hover:text-gold text-sm transition-colors leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Gold divider */}
      <div className="border-t border-white/10">
        <div className="container-wide py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center sm:text-left">
              © 2026 CA Excellence Institute. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-white/40 hover:text-gold text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/40 hover:text-gold text-sm transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

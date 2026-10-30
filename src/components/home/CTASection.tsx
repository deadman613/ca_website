import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-navy py-20 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute -top-20 right-[10%] w-64 h-64 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label mb-4 block">Start Your Journey</span>
          <h2 className="font-playfair text-white text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to Begin Your{" "}
            <span className="text-gold-light italic">CA or CS Journey?</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Book a free demo class today. Our academic counsellors will guide
            you to the right course and batch based on your stream, stage and goals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact#demo" className="btn-gold text-sm">
              Book Free Demo Class
              <ArrowRight size={15} className="ml-2" />
            </Link>
            <Link href="/contact" className="btn-outline-white text-sm">
              Contact Delhi CA School
            </Link>
          </div>

          {/* Trust micro-text */}
          <p className="text-white/30 text-xs mt-8 tracking-wide">
            No commitment required · Free counselling · Demo available for all
            courses
          </p>
        </div>
      </div>
    </section>
  );
}

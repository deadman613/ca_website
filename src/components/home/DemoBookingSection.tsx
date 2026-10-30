"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useStream } from "@/components/layout/StreamProvider";

export default function DemoBookingSection() {
  const { stream } = useStream();

  return (
    <section className="section-padding bg-off-white" id="demo-booking">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm lg:p-10">
          <span className="section-label mb-3 block">Free Demo</span>
          <h2 className="mb-3 font-playfair text-3xl font-bold text-navy">
            Explore your {stream} course options
          </h2>
          <p className="mb-8 text-sm text-secondary">
            Contact Delhi CA School to ask about courses, preparation, or demo
            class availability.
          </p>
          <Link href="/contact#demo" className="btn-primary inline-flex">
            Send an Enquiry
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15)
    .regex(/^[+\d\s-]+$/, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  course: z.string().min(1, "Please select a course of interest"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const courses = [
  "CA Foundation",
  "CA Intermediate",
  "CA Final",
  "Not sure — need guidance",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Form data:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-navy section-padding">
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="section-label mb-4 block">Get in Touch</span>
            <h1 className="font-playfair text-white text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Let&apos;s Start Your
              <br />
              <span className="text-gold-light italic">CA Journey.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Reach out to our team to book a free demo, enquire about courses,
              or simply ask any question. We&apos;re happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left — Info */}
            <div className="lg:col-span-2">
              <h2 className="font-playfair text-navy text-2xl font-bold mb-8">
                Contact Information
              </h2>

              <div className="space-y-6 mb-10">
                <a
                  href="tel:+919876543210"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/25 transition-colors">
                    <Phone size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-muted text-xs mb-1 font-medium uppercase tracking-wide"
                      style={{ color: "var(--text-muted)" }}>Phone</p>
                    <p className="text-navy font-semibold">+91 98765 43210</p>
                    <p className="text-secondary text-sm" style={{ color: "var(--text-secondary)" }}>
                      Mon–Sat, 9 AM – 7 PM
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                    <MessageCircle size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-muted text-xs mb-1 font-medium uppercase tracking-wide"
                      style={{ color: "var(--text-muted)" }}>WhatsApp</p>
                    <p className="text-navy font-semibold">+91 98765 43210</p>
                    <p className="text-secondary text-sm" style={{ color: "var(--text-secondary)" }}>
                      Quick replies on WhatsApp
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:info@caexcellence.in"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/25 transition-colors">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-muted text-xs mb-1 font-medium uppercase tracking-wide"
                      style={{ color: "var(--text-muted)" }}>Email</p>
                    <p className="text-navy font-semibold">info@caexcellence.in</p>
                    <p className="text-secondary text-sm" style={{ color: "var(--text-secondary)" }}>
                      We reply within 24 hours
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-muted text-xs mb-1 font-medium uppercase tracking-wide"
                      style={{ color: "var(--text-muted)" }}>Address</p>
                    <p className="text-navy font-semibold">123 Commerce House, 2nd Floor</p>
                    <p className="text-secondary text-sm" style={{ color: "var(--text-secondary)" }}>
                      Financial District, Your City — 400001
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="h-48 bg-off-white rounded-xl border border-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={28} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-muted text-sm" style={{ color: "var(--text-muted)" }}>
                    Google Maps — embed your location here
                  </p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center gap-3 w-full p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
              >
                <MessageCircle size={20} className="text-green-600" />
                <div>
                  <p className="text-green-800 font-semibold text-sm">Chat on WhatsApp</p>
                  <p className="text-green-600 text-xs">Get instant responses</p>
                </div>
                <ArrowRight size={16} className="text-green-600 ml-auto" />
              </a>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <div className="bg-off-white border border-gray-100 rounded-2xl p-7 lg:p-10">
                <h2 className="font-playfair text-navy text-2xl font-bold mb-2" id="demo">
                  Book a Free Demo / Submit Enquiry
                </h2>
                <p className="text-secondary text-sm mb-8"
                  style={{ color: "var(--text-secondary)" }}>
                  Fill in your details and our academic counsellor will reach out within 24 hours.
                </p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={28} className="text-green-600" />
                    </div>
                    <h3 className="font-playfair text-navy text-2xl font-bold mb-3">
                      Enquiry Submitted!
                    </h3>
                    <p className="text-secondary leading-relaxed max-w-sm mx-auto text-sm"
                      style={{ color: "var(--text-secondary)" }}>
                      Thank you. Our academic counsellor will contact you shortly to
                      discuss your requirements and guide you to the right course.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 btn-secondary text-sm px-5 py-2.5"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-navy text-sm font-semibold mb-2">
                          Full Name *
                        </label>
                        <input
                          {...register("name")}
                          type="text"
                          placeholder="Your full name"
                          className="input-field"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-navy text-sm font-semibold mb-2">
                          Phone Number *
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="input-field"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1.5">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-navy text-sm font-semibold mb-2">
                        Email Address *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="your@email.com"
                        className="input-field"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-navy text-sm font-semibold mb-2">
                        Course of Interest *
                      </label>
                      <select {...register("course")} className="input-field bg-white">
                        <option value="">Select a course</option>
                        {courses.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      {errors.course && (
                        <p className="text-red-500 text-xs mt-1.5">{errors.course.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-navy text-sm font-semibold mb-2">
                        Message (Optional)
                      </label>
                      <textarea
                        {...register("message")}
                        rows={4}
                        placeholder="Tell us about your preparation stage, current qualification, or any specific question..."
                        className="input-field resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full text-sm py-4 mt-2 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2 justify-center">
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        <>Submit Enquiry <ArrowRight size={15} /></>
                      )}
                    </button>

                    <p className="text-muted text-xs text-center" style={{ color: "var(--text-muted)" }}>
                      We respect your privacy. Your information will not be shared with third parties.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Camera, CheckCircle2, Mail, Phone } from "lucide-react";
import StreamSwitcher from "@/components/layout/StreamSwitcher";
import { useStream } from "@/components/layout/StreamProvider";
import { siteContact } from "@/lib/site";

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

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { stream } = useStream();
  const courses =
    stream === "CA"
      ? ["CA Foundation", "CA Intermediate", "CA Final"]
      : ["CSEET (Foundation)", "CS Executive", "CS Professional"];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const params = new URLSearchParams({
      subject: `${data.course} enquiry from ${data.name}`,
      body: [
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Course: ${data.course}`,
        `Message: ${data.message ?? ""}`,
      ].join("\n"),
    });
    window.location.assign(`mailto:${siteContact.email}?${params.toString()}`);
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
            <div className="mb-5">
              <StreamSwitcher />
            </div>
            <h1 className="font-playfair text-white text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Let&apos;s Start Your
              <br />
              <span className="text-gold-light italic">{stream} Journey.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Reach out to our team to book a free {stream} demo, enquire about courses,
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
              <h2 className="font-playfair text-navy text-2xl font-bold mb-4">
                Delhi CA School
              </h2>
              <div className="space-y-5">
                <a
                  href={siteContact.phoneHref}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-muted text-xs mb-1 font-medium uppercase tracking-wide"
                      style={{ color: "var(--text-muted)" }}>Phone</p>
                    <p className="text-navy font-semibold">{siteContact.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${siteContact.email}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-muted text-xs mb-1 font-medium uppercase tracking-wide"
                      style={{ color: "var(--text-muted)" }}>Email</p>
                    <p className="text-navy font-semibold">{siteContact.email}</p>
                  </div>
                </a>
                <a
                  href={siteContact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center flex-shrink-0">
                    <Camera size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-muted text-xs mb-1 font-medium uppercase tracking-wide"
                      style={{ color: "var(--text-muted)" }}>Instagram</p>
                    <p className="text-navy font-semibold">@{siteContact.instagram}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <div className="bg-off-white border border-gray-100 rounded-2xl p-7 lg:p-10">
                <h2 className="font-playfair text-navy text-2xl font-bold mb-2" id="demo">
                  Book a Free Demo / Submit Enquiry
                </h2>
                <p className="text-secondary text-sm mb-8"
                  style={{ color: "var(--text-secondary)" }}>
                  Fill in your details to prepare an email enquiry. Review and send it using your email app.
                </p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={28} className="text-green-600" />
                    </div>
                    <h3 className="font-playfair text-navy text-2xl font-bold mb-3">
                      Email Draft Prepared
                    </h3>
                    <p className="text-secondary leading-relaxed max-w-sm mx-auto text-sm"
                      style={{ color: "var(--text-secondary)" }}>
                      Your email app should open with your enquiry ready to send.
                      If it does not, email us at {siteContact.email}.
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
                          placeholder="Your phone number"
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
                        <option value="Not sure — need guidance">
                          Not sure — need guidance
                        </option>
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
                      className="btn-primary w-full text-sm py-4 mt-2 disabled:opacity-60"
                    >
                      <>Prepare Email Enquiry <ArrowRight size={15} /></>
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

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import { siteContact } from "@/lib/site";

const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z
    .string()
    .min(10, "Enter a valid phone number.")
    .max(15, "Enter a valid phone number.")
    .regex(/^[+\d\s-]+$/, "Enter a valid phone number."),
  email: z.string().email("Enter a valid email address."),
  course: z.string().min(1, "Please choose a course."),
  message: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

const courses = [
  "CA Foundation",
  "CA Intermediate",
  "CA Final",
  "CS CSEET",
  "CS Executive",
  "CS Professional",
  "CAT",
  "Not sure yet",
];

export default function CTASection() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormData>({ resolver: zodResolver(enquirySchema) });

  const onSubmit = (data: EnquiryFormData) => {
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
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#e7e0d2] bg-white shadow-sm">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col justify-center bg-[#f7f4ed] p-7 sm:p-10 lg:p-12">
              <span className="section-label mb-4 block">Enquire with us</span>
              <h2 className="mb-4 font-playfair text-3xl font-bold leading-tight text-navy sm:text-4xl">
                Let&apos;s plan your next step.
              </h2>
              <p className="text-sm leading-7 text-secondary sm:text-base">
                Share a few details and our academic team will help you find the right course and preparation plan.
              </p>
              <p className="mt-6 text-xs leading-5 text-muted">
                No commitment required. Your email app will open with your enquiry ready to send.
              </p>
            </div>

            <div className="p-6 sm:p-9 lg:p-12">
              {submitted ? (
                <div className="flex min-h-72 flex-col items-center justify-center text-center">
                  <CheckCircle2 aria-hidden="true" className="mb-4 text-emerald-600" size={40} />
                  <h3 className="font-playfair text-2xl font-bold text-navy">Your enquiry is ready</h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-secondary">
                    Your email app should have opened with your details. Please send the prepared email to complete your enquiry.
                  </p>
                  <button
                    className="mt-5 text-sm font-semibold text-navy underline decoration-gold underline-offset-4"
                    onClick={() => setSubmitted(false)}
                    type="button"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-navy" htmlFor="home-enquiry-name">Full name</label>
                      <input
                        {...register("name")}
                        autoComplete="name"
                        className="input-field"
                        id="home-enquiry-name"
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-navy" htmlFor="home-enquiry-phone">Phone number</label>
                      <input
                        {...register("phone")}
                        autoComplete="tel"
                        className="input-field"
                        id="home-enquiry-phone"
                        placeholder="Your phone number"
                        type="tel"
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-navy" htmlFor="home-enquiry-email">Email address</label>
                      <input
                        {...register("email")}
                        autoComplete="email"
                        className="input-field"
                        id="home-enquiry-email"
                        placeholder="you@example.com"
                        type="email"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-navy" htmlFor="home-enquiry-course">Course of interest</label>
                      <select {...register("course")} className="input-field bg-white" id="home-enquiry-course" defaultValue="">
                        <option disabled value="">Choose a course</option>
                        {courses.map((course) => <option key={course} value={course}>{course}</option>)}
                      </select>
                      {errors.course && <p className="mt-1 text-xs text-red-600">{errors.course.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-navy" htmlFor="home-enquiry-message">How can we help? <span className="font-normal text-muted">(optional)</span></label>
                    <textarea
                      {...register("message")}
                      className="input-field min-h-24 resize-y"
                      id="home-enquiry-message"
                      placeholder="Tell us what you would like to know"
                      rows={3}
                    />
                  </div>
                  <button className="btn-gold inline-flex w-full items-center justify-center gap-2 sm:w-auto" type="submit">
                    Send enquiry <Send aria-hidden="true" size={15} />
                  </button>
                  <p className="text-xs leading-5 text-muted">
                    This will prepare an email to {siteContact.email} in your email app.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

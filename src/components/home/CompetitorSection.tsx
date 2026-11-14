import { Check, X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";

const features = [
  {
    feature: "Expert CA-qualified faculty",
    us: true,
    typical: "Sometimes",
    note: "Every subject taught by practicing CAs",
  },
  {
    feature: "Small batch sizes (≤ 30 students)",
    us: true,
    typical: false,
    note: "More attention per student",
  },
  {
    feature: "Dedicated doubt sessions",
    us: true,
    typical: "Limited",
    note: "Weekly scheduled doubt clearing",
  },
  {
    feature: "Free revision batch before exam",
    us: true,
    typical: false,
    note: "Included in course fee",
  },
  {
    feature: "Faculty on WhatsApp for support",
    us: true,
    typical: false,
    note: "Direct faculty access",
  },
  {
    feature: "Printed study material included",
    us: true,
    typical: "Extra cost",
    note: "No hidden charges",
  },
  {
    feature: "All-India test series access",
    us: true,
    typical: "Extra cost",
    note: "Included in course fee",
  },
  {
    feature: "Articleship guidance (Intermediate)",
    us: true,
    typical: false,
    note: "Career planning support",
  },
];

const highlights = [
  { number: "30", unit: "max", label: "Students per batch" },
  { number: "100%", unit: "", label: "CA-qualified faculty" },
  { number: "₹0", unit: "extra", label: "Hidden charges" },
  { number: "24/7", unit: "", label: "WhatsApp support" },
];

function UsCell() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-navy/10">
      <Check size={13} className="text-navy" strokeWidth={3} />
    </span>
  );
}

function TypicalCell({ value }: { value: boolean | string }) {
  if (value === false)
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
        <X size={13} className="text-gray-400" strokeWidth={2.5} />
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
      {value}
    </span>
  );
}

export default function CompetitorSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        {/* Heading */}
        <div className="mb-12">
          <SectionHeading
            label="Why Choose Us"
            title="What Sets Delhi CA School Apart"
            subtitle="A transparent look at what you get — and what most institutes don't offer."
            align="center"
          />
        </div>

        {/* Stat highlights */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm"
            >
              <div className="font-playfair text-3xl font-bold text-navy">
                {h.number}
                <span className="ml-1 text-base font-semibold text-navy/50">{h.unit}</span>
              </div>
              <p className="mt-1.5 text-sm font-medium text-gray-500">{h.label}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Feature
                </th>
                <th className="px-6 py-4 text-center">
                  <span className="inline-block rounded-full border border-navy/30 bg-navy/8 px-3 py-0.5 text-xs font-bold text-navy">
                    Delhi CA School
                  </span>
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Typical Institutes
                </th>
                <th className="hidden px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400 md:table-cell">
                  Our Advantage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {features.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`transition-colors hover:bg-blue-50/40 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">{row.feature}</td>
                  <td className="px-6 py-4 text-center">
                    <UsCell />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <TypicalCell value={row.typical} />
                  </td>
                  <td className="hidden px-6 py-4 text-xs text-gray-400 md:table-cell">
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 text-center">
          <Link href="/contact#demo" className="btn-primary inline-flex items-center gap-2">
            Experience the Difference — Book a Free Demo
          </Link>
        </div>
      </div>
    </section>
  );
}


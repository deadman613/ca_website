import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CA Excellence Institute | Premier CA Coaching in India",
    template: "%s | CA Excellence Institute",
  },
  description:
    "CA Excellence Institute offers structured CA Foundation, Intermediate and Final coaching with expert faculty, comprehensive study material, and dedicated doubt sessions. Join 5,000+ successful students.",
  keywords: [
    "CA coaching",
    "CA Foundation classes",
    "CA Intermediate coaching",
    "CA Final preparation",
    "Chartered Accountant coaching",
    "CA classes India",
    "CA preparation",
    "ICAI coaching",
  ],
  authors: [{ name: "CA Excellence Institute" }],
  creator: "CA Excellence Institute",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://caexcellence.in",
    siteName: "CA Excellence Institute",
    title: "CA Excellence Institute | Premier CA Coaching in India",
    description:
      "Structured CA coaching with expert faculty, comprehensive study material and consistent practice — designed to build confident CA aspirants.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CA Excellence Institute",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CA Excellence Institute | Premier CA Coaching",
    description:
      "Structured CA coaching with expert faculty and dedicated support for CA aspirants.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={poppins.variable}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

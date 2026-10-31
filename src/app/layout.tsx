import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { StreamProvider } from "@/components/layout/StreamProvider";
import { siteName, siteUrl } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${siteName} | CA Coaching in Delhi`,
    template: `%s | ${siteName}`,
  },
  description:
    "Delhi CA School supports CA aspirants in Delhi with structured preparation for CA Foundation, Intermediate, and Final.",
  keywords: [
    "CA coaching in Delhi",
    "CA classes in Delhi",
    siteName,
    "CSEET coaching",
    "CS Executive coaching",
    "CA Foundation classes",
    "CA Intermediate coaching",
    "CA Final preparation",
    "Chartered Accountant coaching",
    "CA coaching Delhi",
    "CA preparation",
    "ICAI coaching",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    ...(siteUrl ? { url: siteUrl } : {}),
    siteName,
    title: `${siteName} | CA Coaching in Delhi`,
    description:
      "Explore structured CA preparation for Foundation, Intermediate, and Final with Delhi CA School.",
  },
  twitter: {
    card: "summary",
    title: `${siteName} | CA Coaching in Delhi`,
    description:
      "Structured CA coaching with expert faculty and dedicated support for CA aspirants.",
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
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col antialiased">
        <StreamProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </StreamProvider>
      </body>
    </html>
  );
}

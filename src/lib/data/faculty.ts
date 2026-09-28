export interface Faculty {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  subjects: string[];
  level: string[];
  philosophy: string;
  bio: string;
  achievements: string[];
  photo: string;
}

export const faculty: Faculty[] = [
  {
    id: "ca-rajesh-mehta",
    name: "CA Rajesh Mehta",
    designation: "Senior Faculty — Taxation",
    qualification: "CA, LLB, M.Com",
    experience: "15+ Years",
    subjects: ["Direct Tax", "Indirect Tax (GST)", "Income Tax Laws"],
    level: ["Intermediate", "Final"],
    philosophy:
      "Taxation is not about memorizing law — it is about understanding intent. I focus on building a conceptual framework that helps students apply the law confidently in any scenario.",
    bio: "CA Rajesh Mehta is one of the most experienced taxation faculty in the institute. A practicing CA with over 15 years of teaching experience, he has guided thousands of students through the complexities of direct and indirect tax laws. His teaching style combines real-world case studies with structured exam preparation.",
    achievements: [
      "Guided 3 AIR holders in Taxation",
      "Published taxation handbook used across 5 institutes",
      "Ex-faculty at two leading CA institutes in Delhi",
      "15+ years of industry and teaching experience",
    ],
    photo: "/faculty/rajesh-mehta.jpg",
  },
  {
    id: "ca-priya-nair",
    name: "CA Priya Nair",
    designation: "Senior Faculty — Accounts & Reporting",
    qualification: "CA, CPA (USA), MBA Finance",
    experience: "12+ Years",
    subjects: [
      "Financial Accounting",
      "Advanced Accounts",
      "Financial Reporting (Ind AS)",
    ],
    level: ["Foundation", "Intermediate", "Final"],
    philosophy:
      "Accounting is the language of business. I make sure every student not only understands the numbers but can also tell the story behind them.",
    bio: "CA Priya Nair brings a rare combination of academic excellence and international exposure to her teaching. Having worked with Big 4 accounting firms and holding a CPA certification from the USA, she provides a unique global perspective to financial reporting and accounting standards.",
    achievements: [
      "Produced 8 All India Rank holders",
      "CPA (USA) — AICPA certified",
      "10 years Big 4 accounting experience",
      "Expert reviewer for ICAI study material",
    ],
    photo: "/faculty/priya-nair.jpg",
  },
  {
    id: "ca-suresh-kumar",
    name: "CA Suresh Kumar",
    designation: "Faculty — Auditing & Law",
    qualification: "CA, CS, LLB",
    experience: "10+ Years",
    subjects: ["Auditing", "Corporate Laws", "Business Laws"],
    level: ["Intermediate", "Final"],
    philosophy:
      "Law and Auditing are about professional judgment. I train students to think like a professional, not just a student preparing for an exam.",
    bio: "CA Suresh Kumar is a multidisciplinary professional holding qualifications in Chartered Accountancy, Company Secretaryship, and Law. He brings this unique combination to his classroom, offering students a 360-degree perspective on corporate governance, auditing standards and legal compliance.",
    achievements: [
      "CA, CS and LLB — three professional qualifications",
      "Featured speaker at ICAI seminars",
      "Co-authored a guide on Corporate Law",
      "10+ years of practice and teaching",
    ],
    photo: "/faculty/suresh-kumar.jpg",
  },
  {
    id: "ca-anita-sharma",
    name: "CA Anita Sharma",
    designation: "Faculty — Foundation & SFM",
    qualification: "CA, MBA Finance",
    experience: "8+ Years",
    subjects: [
      "Accounts (Foundation)",
      "Business Economics",
      "Strategic Financial Management",
    ],
    level: ["Foundation", "Final"],
    philosophy:
      "The Foundation stage is where CA careers are made or lost. I invest deeply in every student's conceptual clarity right from the beginning, because a strong start creates a confident professional.",
    bio: "CA Anita Sharma specializes in teaching Foundation students and Strategic Financial Management at the Final level. Known for her patient teaching style and exceptional ability to simplify complex financial concepts, she has been consistently rated as one of the top faculty by students.",
    achievements: [
      "100% pass rate for batch students in Foundation (2023)",
      "Ranked #1 faculty in student satisfaction survey",
      "Specialized certification in Financial Derivatives",
      "8+ years of structured CA teaching",
    ],
    photo: "/faculty/anita-sharma.jpg",
  },
];

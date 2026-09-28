export interface Course {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  level: "Foundation" | "Intermediate" | "Final";
  tagline: string;
  description: string;
  eligibility: string;
  duration: string;
  subjects: Subject[];
  batches: Batch[];
  features: string[];
  fee: FeeStructure;
  icon: string;
}

export interface Subject {
  code: string;
  name: string;
  group?: string;
  description?: string;
}

export interface Batch {
  name: string;
  timing: string;
  duration: string;
  fee: string;
  type: "Regular" | "Fast Track" | "Weekend";
  startDate?: string;
  seats?: number;
}

export interface FeeStructure {
  regular: string;
  fastTrack?: string;
  includes: string[];
}

export const courses: Course[] = [
  {
    id: "foundation",
    slug: "foundation",
    title: "CA Foundation",
    shortTitle: "Foundation",
    level: "Foundation",
    tagline: "Build Your Strongest Start",
    description:
      "Begin your CA journey with a rock-solid foundation. Our Foundation program is designed to develop deep conceptual clarity across all four papers, with structured practice and regular assessments that ensure consistent progress.",
    eligibility:
      "Passed Class XII (10+2) from any recognized board. Students can register after Class X and appear in the Foundation exam after 4 months of study.",
    duration: "4–5 Months",
    subjects: [
      {
        code: "Paper 1",
        name: "Principles and Practice of Accounting",
        description:
          "Fundamentals of accounting, financial statements, and special accounting areas",
      },
      {
        code: "Paper 2",
        name: "Business Laws and Business Correspondence",
        description:
          "Key business laws, communication skills and professional writing",
      },
      {
        code: "Paper 3",
        name: "Business Mathematics, Logical Reasoning and Statistics",
        description:
          "Quantitative aptitude, logical reasoning and statistical applications",
      },
      {
        code: "Paper 4",
        name: "Business Economics and Business and Commercial Knowledge",
        description:
          "Economic concepts, market structures and commercial awareness",
      },
    ],
    batches: [
      {
        name: "Regular Batch",
        timing: "Morning: 7:00 AM – 9:00 AM",
        duration: "5 Months",
        fee: "₹35,000",
        type: "Regular",
        seats: 30,
      },
      {
        name: "Evening Batch",
        timing: "Evening: 5:30 PM – 7:30 PM",
        duration: "5 Months",
        fee: "₹35,000",
        type: "Regular",
        seats: 30,
      },
      {
        name: "Fast Track Batch",
        timing: "Flexible Timing",
        duration: "3 Months",
        fee: "₹40,000",
        type: "Fast Track",
        seats: 20,
      },
    ],
    features: [
      "Comprehensive printed study material",
      "Weekly mock tests",
      "Dedicated doubt-solving sessions",
      "All-India test series access",
      "Revision batch before exam",
      "Faculty support via WhatsApp",
    ],
    fee: {
      regular: "₹35,000",
      fastTrack: "₹40,000",
      includes: [
        "All lectures",
        "Study material (printed)",
        "Mock tests",
        "Doubt sessions",
        "Revision support",
      ],
    },
    icon: "📚",
  },
  {
    id: "intermediate",
    slug: "intermediate",
    title: "CA Intermediate",
    shortTitle: "Intermediate",
    level: "Intermediate",
    tagline: "Develop Depth. Build Expertise.",
    description:
      "The Intermediate level demands deeper subject knowledge and consistent practice across both groups. Our structured program covers every topic systematically with integrated practical training and regular test series.",
    eligibility:
      "Passed CA Foundation OR Graduation/Post-Graduation in relevant stream (Direct Entry). Students must have completed 9 months from ICAI registration before appearing.",
    duration: "12–18 Months (Group-wise or Combined)",
    subjects: [
      {
        code: "Group 1",
        name: "Group I — Core Subjects",
        description: "Advanced Accounting, Corporate Laws, Taxation (Income Tax)",
        group: "Group 1",
      },
      {
        code: "G1-P1",
        name: "Advanced Accounting",
        group: "Group 1",
        description:
          "Advanced financial accounting, corporate accounts and special transactions",
      },
      {
        code: "G1-P2",
        name: "Corporate and Other Laws",
        group: "Group 1",
        description:
          "Companies Act, LLP Act, and other relevant commercial laws",
      },
      {
        code: "G1-P3",
        name: "Taxation",
        group: "Group 1",
        description: "Income Tax Act and Goods and Services Tax (GST)",
      },
      {
        code: "G2-P4",
        name: "Cost and Management Accounting",
        group: "Group 2",
        description: "Cost concepts, marginal costing, budgeting and variance analysis",
      },
      {
        code: "G2-P5",
        name: "Auditing and Ethics",
        group: "Group 2",
        description: "Auditing standards, audit process and professional ethics",
      },
      {
        code: "G2-P6",
        name: "Financial Management and Strategic Management",
        group: "Group 2",
        description:
          "Financial analysis, working capital management and strategic concepts",
      },
    ],
    batches: [
      {
        name: "Group 1 Regular",
        timing: "Morning: 6:30 AM – 9:30 AM",
        duration: "8 Months",
        fee: "₹55,000",
        type: "Regular",
      },
      {
        name: "Group 2 Regular",
        timing: "Evening: 5:00 PM – 8:00 PM",
        duration: "8 Months",
        fee: "₹55,000",
        type: "Regular",
      },
      {
        name: "Both Groups Combined",
        timing: "Full-Day Schedule",
        duration: "14 Months",
        fee: "₹95,000",
        type: "Regular",
      },
      {
        name: "Fast Track (Both Groups)",
        timing: "Intensive Schedule",
        duration: "8 Months",
        fee: "₹1,05,000",
        type: "Fast Track",
      },
    ],
    features: [
      "Group-wise structured preparation",
      "Subject-expert faculty for each paper",
      "Articleship guidance and support",
      "Bi-weekly mock tests",
      "Past year question analysis",
      "Revision crash course before exam",
    ],
    fee: {
      regular: "₹55,000 per group",
      fastTrack: "₹1,05,000 (both groups)",
      includes: [
        "All lectures",
        "Study material",
        "Mock test series",
        "Doubt sessions",
        "Revision support",
        "Articleship guidance",
      ],
    },
    icon: "⚖️",
  },
  {
    id: "final",
    slug: "final",
    title: "CA Final",
    shortTitle: "Final",
    level: "Final",
    tagline: "Advanced Preparation. Exam Readiness.",
    description:
      "The CA Final is the ultimate examination that requires strategic preparation, deep subject mastery and consistent revision. Our Final program is designed for serious aspirants who want to clear the exam in the first attempt.",
    eligibility:
      "Passed CA Intermediate (both groups) and completed 2.5 years of articleship. Must be registered with ICAI for at least 6 months before appearing.",
    duration: "18–24 Months",
    subjects: [
      {
        code: "G1-P1",
        name: "Financial Reporting",
        group: "Group 1",
        description:
          "Ind AS, IFRS, consolidated financial statements and complex reporting",
      },
      {
        code: "G1-P2",
        name: "Strategic Financial Management",
        group: "Group 1",
        description:
          "Portfolio management, derivatives, mergers and acquisitions",
      },
      {
        code: "G1-P3",
        name: "Advanced Auditing, Assurance and Professional Ethics",
        group: "Group 1",
        description: "Advanced audit concepts, quality control and professional conduct",
      },
      {
        code: "G1-P4",
        name: "Corporate and Economic Laws",
        group: "Group 1",
        description: "SEBI regulations, competition law, economic laws",
      },
      {
        code: "G2-P5",
        name: "Strategic Cost Management and Performance Evaluation",
        group: "Group 2",
        description: "Advanced costing, performance measurement and strategy",
      },
      {
        code: "G2-P6",
        name: "Elective Paper",
        group: "Group 2",
        description:
          "Risk Management / Financial Services / International Taxation / Economic Laws / GST",
      },
      {
        code: "G2-P7",
        name: "Direct Tax Laws and International Taxation",
        group: "Group 2",
        description:
          "Advanced income tax, transfer pricing and international taxation",
      },
      {
        code: "G2-P8",
        name: "Indirect Tax Laws",
        group: "Group 2",
        description: "GST in depth, customs law and FTP",
      },
    ],
    batches: [
      {
        name: "Regular Batch (Both Groups)",
        timing: "Morning: 6:00 AM – 10:00 AM",
        duration: "18 Months",
        fee: "₹1,40,000",
        type: "Regular",
      },
      {
        name: "Fast Track Batch",
        timing: "Intensive: Full Day",
        duration: "10 Months",
        fee: "₹1,60,000",
        type: "Fast Track",
      },
      {
        name: "Group 1 Only",
        timing: "Morning: 6:00 AM – 9:00 AM",
        duration: "10 Months",
        fee: "₹80,000",
        type: "Regular",
      },
      {
        name: "Group 2 Only",
        timing: "Evening: 5:00 PM – 8:00 PM",
        duration: "10 Months",
        fee: "₹80,000",
        type: "Regular",
      },
    ],
    features: [
      "Advanced subject-expert faculty",
      "Intensive revision program",
      "Past 10-year question analysis",
      "Full-length mock examinations",
      "One-to-one doubt resolution",
      "Placement and campus support",
    ],
    fee: {
      regular: "₹1,40,000 (both groups)",
      fastTrack: "₹1,60,000",
      includes: [
        "All lectures",
        "Premium study material",
        "Mock exam series",
        "Doubt sessions",
        "Revision crash course",
        "Placement support",
      ],
    },
    icon: "🏆",
  },
];

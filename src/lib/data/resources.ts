export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: "Notes" | "Video" | "Test Paper" | "Answer Key" | "Question Bank";
  level: "Foundation" | "Intermediate" | "Final" | "General";
  subject: string;
  thumbnail?: string;
  downloadUrl?: string;
  viewUrl?: string;
  fileSize?: string;
  isFree: boolean;
  dateAdded: string;
  downloads?: number;
}

export const resources: Resource[] = [
  {
    id: "r1",
    slug: "foundation-accounts-notes",
    title: "CA Foundation — Accounts Complete Notes",
    description:
      "Comprehensive chapter-wise notes covering all topics from the ICAI syllabus for Paper 1 — Principles and Practice of Accounting. Includes solved examples and important questions.",
    type: "Notes",
    level: "Foundation",
    subject: "Accounts",
    isFree: true,
    dateAdded: "2024-08-15",
    downloads: 2340,
  },
  {
    id: "r2",
    slug: "foundation-law-notes",
    title: "CA Foundation — Business Laws Summary Notes",
    description:
      "Concise, exam-focused notes for Paper 2 covering Business Laws, Indian Contract Act, Sale of Goods Act, and other key statutes with case law references.",
    type: "Notes",
    level: "Foundation",
    subject: "Business Laws",
    isFree: true,
    dateAdded: "2024-08-20",
    downloads: 1876,
  },
  {
    id: "r3",
    slug: "foundation-mock-test-1",
    title: "CA Foundation Mock Test — November 2024 Series 1",
    description:
      "Full-length mock test paper for CA Foundation covering all 4 papers with ICAI-format marking. Includes answer key and examiner's comments.",
    type: "Test Paper",
    level: "Foundation",
    subject: "All Papers",
    isFree: true,
    dateAdded: "2024-09-10",
    downloads: 3102,
  },
  {
    id: "r4",
    slug: "intermediate-taxation-notes",
    title: "CA Intermediate — Taxation (Income Tax) Complete Notes",
    description:
      "Detailed chapter-wise notes for Income Tax with amendments updated for the current assessment year. Covers residential status, heads of income, deductions and TDS.",
    type: "Notes",
    level: "Intermediate",
    subject: "Taxation",
    isFree: true,
    dateAdded: "2024-07-12",
    downloads: 4521,
  },
  {
    id: "r5",
    slug: "intermediate-audit-notes",
    title: "CA Intermediate — Auditing & Ethics Notes",
    description:
      "Structured notes for Auditing covering all Standards on Auditing (SAs), audit planning, internal audit and professional ethics with MCQ practice sets.",
    type: "Notes",
    level: "Intermediate",
    subject: "Auditing",
    isFree: true,
    dateAdded: "2024-08-02",
    downloads: 2890,
  },
  {
    id: "r6",
    slug: "intermediate-group2-mock-test",
    title: "CA Intermediate Group 2 — Mock Test Paper",
    description:
      "Complete mock test for Group 2 (Cost Accounting, Auditing, FM & SM) in ICAI examination format. Detailed solutions and marking scheme included.",
    type: "Test Paper",
    level: "Intermediate",
    subject: "Group 2",
    isFree: true,
    dateAdded: "2024-09-05",
    downloads: 2104,
  },
  {
    id: "r7",
    slug: "final-sfm-notes",
    title: "CA Final — Strategic Financial Management Notes",
    description:
      "Advanced notes for SFM covering financial instruments, derivatives, portfolio management, M&A and international finance with solved practicals and formula charts.",
    type: "Notes",
    level: "Final",
    subject: "Strategic Financial Management",
    isFree: true,
    dateAdded: "2024-07-28",
    downloads: 3344,
  },
  {
    id: "r8",
    slug: "final-direct-tax-notes",
    title: "CA Final — Direct Tax Laws & International Taxation Notes",
    description:
      "Comprehensive notes for Direct Tax covering advanced income tax provisions, transfer pricing, DTAA, GAAR and international taxation concepts.",
    type: "Notes",
    level: "Final",
    subject: "Direct Tax Laws",
    isFree: true,
    dateAdded: "2024-08-10",
    downloads: 2780,
  },
  {
    id: "r9",
    slug: "final-mock-test-group1",
    title: "CA Final Group 1 — Full Mock Test Series",
    description:
      "Three full-length mock test papers for CA Final Group 1 (FR, SFM, Audit, Law) with detailed solutions, marking guide and performance analysis.",
    type: "Test Paper",
    level: "Final",
    subject: "Group 1",
    isFree: true,
    dateAdded: "2024-09-01",
    downloads: 1956,
  },
];

export const resourceCategories = [
  { id: "all", label: "All Resources" },
  { id: "Foundation", label: "Foundation" },
  { id: "Intermediate", label: "Intermediate" },
  { id: "Final", label: "Final" },
  { id: "Test Paper", label: "Test Papers" },
];

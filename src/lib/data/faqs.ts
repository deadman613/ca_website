export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqs: FAQ[] = [
  {
    id: "which-course",
    question: "Which CA course should I join?",
    answer:
      "It depends on your current academic stage. If you have passed Class XII, you should start with CA Foundation. If you are a graduate or postgraduate in Commerce/Law/Management, you may be eligible for Direct Entry into CA Intermediate. Our academic counsellors will guide you to the right course after a free counselling session.",
    category: "General",
  },
  {
    id: "foundation-eligibility",
    question: "What is the eligibility for CA Foundation?",
    answer:
      "To enroll in CA Foundation, you must have passed Class XII (10+2) from any recognized board. You can even register after Class X and appear in the Foundation exam after completing a minimum 4-month study period post Class XII. The CA Foundation has 4 papers and is conducted twice a year by ICAI.",
    category: "Foundation",
  },
  {
    id: "study-material",
    question: "Do you provide study material?",
    answer:
      "Yes. All our course fees include comprehensive printed study material curated by our faculty. The material is structured chapter-by-chapter and covers theory, practice questions, and past exam papers. Students also receive access to our digital resource library with notes, lecture recordings and test papers.",
    category: "General",
  },
  {
    id: "mock-tests",
    question: "Are mock tests included in the course fee?",
    answer:
      "Yes. Weekly mock tests, monthly full-length exams, and a dedicated test series before the exam are all included in the fee. We believe consistent testing is one of the most critical components of CA preparation, so all tests are planned into the curriculum from day one.",
    category: "General",
  },
  {
    id: "doubt-sessions",
    question: "Do you provide doubt sessions?",
    answer:
      "Yes. We offer structured doubt sessions twice a week for every batch. Students can also connect with faculty directly via our WhatsApp group for quick queries. For complex doubts, one-to-one sessions can be scheduled with the subject faculty.",
    category: "General",
  },
  {
    id: "batch-timings",
    question: "What are the batch timings?",
    answer:
      "We offer morning batches (6:00 AM – 9:00 AM / 7:00 AM – 9:00 AM) and evening batches (5:00 PM – 8:00 PM) for all courses. Weekend batches are also available for working students and articleship students. Specific timings vary by course and batch — please contact us for the current schedule.",
    category: "General",
  },
  {
    id: "demo-class",
    question: "Do you provide demo classes?",
    answer:
      "Absolutely. We encourage all prospective students to attend a free demo class before enrolling. The demo gives you a clear sense of our teaching methodology, faculty interaction, and classroom environment. You can book a free demo class through our website or by calling us directly.",
    category: "General",
  },
  {
    id: "online-offline",
    question: "Are classes available online or only offline?",
    answer:
      "We primarily run offline classroom batches for the best learning experience. However, missed lectures can be accessed via recorded video sessions. We also provide a digital study portal for notes, tests, and resources accessible from any device.",
    category: "General",
  },
  {
    id: "direct-entry",
    question: "What is Direct Entry into CA Intermediate?",
    answer:
      "Commerce graduates with 55% marks, or graduates from any stream with 60% marks, can directly register for CA Intermediate without clearing CA Foundation. This is known as Direct Entry. Our counsellors can help you verify your eligibility and guide you through the ICAI registration process.",
    category: "Intermediate",
  },
  {
    id: "articleship",
    question: "Do you guide students on articleship?",
    answer:
      "Yes. Our faculty team provides guidance on finding the right articleship firm, managing study alongside training, and maximizing the learning during the articleship period. We also have connections with leading CA firms who prefer hiring from our institute.",
    category: "Intermediate",
  },
];

export interface Testimonial {
  id: string;
  name: string;
  qualification: string;
  rank?: string;
  batch: string;
  review: string;
  rating: number;
  photo?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Arjun Patel",
    qualification: "CA Intermediate Cleared",
    rank: "AIR 12",
    batch: "2024 Batch",
    review:
      "CA Excellence Institute completely transformed my preparation. The faculty here doesn't just teach — they build your thinking. The structured approach to each paper, combined with regular mock tests, made me genuinely confident before the exam. I could not have achieved AIR 12 without this guidance.",
    rating: 5,
    photo: "/testimonials/arjun.jpg",
  },
  {
    id: "t2",
    name: "Sneha Reddy",
    qualification: "CA Foundation Cleared",
    batch: "2024 Batch",
    review:
      "The Foundation program here is exceptional. As a student who was nervous about the CA journey, the faculty made every concept accessible and the doubt sessions were incredibly helpful. The study material is also comprehensive — I didn't need anything beyond what was provided.",
    rating: 5,
    photo: "/testimonials/sneha.jpg",
  },
  {
    id: "t3",
    name: "Karthik Rajan",
    qualification: "CA Final Cleared",
    batch: "2023 Batch",
    review:
      "I joined the Fast Track Final batch and was amazed at the quality of preparation. The faculty's depth of knowledge, especially in Financial Reporting and Direct Tax, is exceptional. The mock exams were tougher than the actual exam, which is exactly what you need for the CA Final.",
    rating: 5,
    photo: "/testimonials/karthik.jpg",
  },
  {
    id: "t4",
    name: "Meera Singh",
    qualification: "CA Intermediate (Group 1)",
    batch: "2024 Batch",
    review:
      "I was a working professional who joined the weekend batch. The flexibility and the dedication of the faculty to accommodate our questions even after class was remarkable. The taxation faculty in particular is outstanding — best I have experienced.",
    rating: 5,
    photo: "/testimonials/meera.jpg",
  },
];

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
    "It depends on your current academic stage. If you have passed Class XII, start with CA Foundation. Commerce graduates with 55%+ or any graduate with 60%+ marks can apply for Direct Entry into CA Intermediate. Our counsellors will guide you to the right course after a free session.",
    category: "General",
  },
  {
    id: "foundation-eligibility",
    question: "What is the eligibility for CA Foundation?",
    answer:
      "To enroll in CA Foundation, you must have passed Class XII (10+2) from any recognized board. You can even register after Class X and appear in the Foundation exam after completing a minimum 4-month study period post Class XII. The CA Foundation has 4 papers and is conducted twice a year by ICAI.",
    "You must have passed Class XII (10+2) from any recognised board. You can register after Class X and appear in the Foundation exam after a minimum 4-month study period post Class XII. The Foundation has 4 papers and is conducted twice a year by ICAI.",
    category: "Foundation",
  },
  {
    id: "study-material",
    question: "Do you provide study material?",
    answer:
      "Yes. All our course fees include comprehensive printed study material curated by our faculty. The material is structured chapter-by-chapter and covers theory, practice questions, and past exam papers. Students also receive access to our digital resource library with notes, lecture recordings and test papers.",
    "Yes. All our course fees include comprehensive printed study material curated by our faculty, structured chapter-by-chapter and covering theory, practice questions, and past exam papers. Students also get access to a digital resource library with notes and lecture recordings.",
    category: "General",
  },
  {
    id: "mock-tests",
    question: "Are mock tests included in the course fee?",
    answer:
      "Yes. Weekly mock tests, monthly full-length exams, and a dedicated test series before the exam are all included in the fee. We believe consistent testing is one of the most critical components of CA preparation, so all tests are planned into the curriculum from day one.",
    "Yes. Weekly mock tests, monthly full-length exams, and a dedicated test series before the exam are all included in the fee. Consistent testing is built into the curriculum from day one.",
    category: "General",
  },
  {
    id: "doubt-sessions",
    question: "Do you provide doubt sessions?",
    answer:
      "Yes. We offer structured doubt sessions twice a week for every batch. Students can also connect with faculty directly via our WhatsApp group for quick queries. For complex doubts, one-to-one sessions can be scheduled with the subject faculty.",
    "Yes. We offer structured doubt sessions twice a week for every batch. Students can also reach faculty via our WhatsApp group for quick queries. One-to-one sessions can be scheduled with the subject faculty for complex doubts.",
    category: "General",
  },
  {
    id: "batch-timings",
    question: "What are the batch timings?",
    answer:
      "We offer morning batches (6:00 AM – 9:00 AM / 7:00 AM – 9:00 AM) and evening batches (5:00 PM – 8:00 PM) for all courses. Weekend batches are also available for working students and articleship students. Specific timings vary by course and batch — please contact us for the current schedule.",
    "Morning batches run from 6:00 AM – 9:00 AM or 7:00 AM – 9:00 AM, and evening batches from 5:00 PM – 8:00 PM. Weekend batches are also available for working students. Contact us for the current schedule.",
    category: "General",
  },
  {
    id: "demo-class",
    question: "Do you provide demo classes?",
    question: "Do you offer demo classes?",
    answer:
      "Absolutely. We encourage all prospective students to attend a free demo class before enrolling. The demo gives you a clear sense of our teaching methodology, faculty interaction, and classroom environment. You can book a free demo class through our website or by calling us directly.",
    "Absolutely. We encourage all prospective students to attend a free demo class before enrolling. It gives you a clear sense of our teaching methodology, faculty interaction, and classroom environment. Book online or call us directly.",
    category: "General",
  },
  {
    id: "online-offline",
    question: "Are classes available online or only offline?",
    answer:
      "We primarily run offline classroom batches for the best learning experience. However, missed lectures can be accessed via recorded video sessions. We also provide a digital study portal for notes, tests, and resources accessible from any device.",
    "We primarily run offline classroom batches. Missed lectures can be accessed via recorded video sessions. We also provide a digital study portal for notes, tests, and resources accessible from any device.",
    category: "General",
  },
  {
    id: "direct-entry",
    question: "What is Direct Entry into CA Intermediate?",
    answer:
      "Commerce graduates with 55% marks, or graduates from any stream with 60% marks, can directly register for CA Intermediate without clearing CA Foundation. This is known as Direct Entry. Our counsellors can help you verify your eligibility and guide you through the ICAI registration process.",
    "Commerce graduates with 55% marks, or graduates from any stream with 60% marks, can directly register for CA Intermediate without clearing CA Foundation. Our counsellors can verify your eligibility and guide you through the ICAI registration process.",
    category: "Intermediate",
  },
  {
    id: "articleship",
    question: "Do you guide students on articleship?",
    answer:
      "Yes. Our faculty team provides guidance on finding the right articleship firm, managing study alongside training, and maximizing the learning during the articleship period. We also have connections with leading CA firms who prefer hiring from our institute.",
    "Yes. Our faculty provides guidance on finding the right articleship firm, managing study alongside training, and maximising the articleship period. We also have connections with leading CA firms who prefer hiring from our institute.",
    category: "Intermediate",
  },
  {
    id: "batch-size",
    question: "How many students are there in each batch?",
    answer:
      "We strictly limit each batch to 30 students. This ensures every student gets individual attention, faculty can track progress, and doubt sessions remain productive. We do not run mass-lecture style batches.",
    category: "General",
  },
  {
    id: "fast-track",
    question: "What is the Fast Track batch?",
    answer:
      "Fast Track batches are intensive programmes that cover the same syllabus in a shorter timeframe — typically 3 months for Foundation and 8 months for Intermediate (both groups). They are ideal for students who need to prepare quickly before an upcoming exam.",
    category: "General",
  },
  {
    id: "fees-structure",
    question: "Are there any hidden charges beyond the course fee?",
    answer:
      "No. Our quoted fee covers all lectures, printed study material, mock tests, doubt sessions, and the revision batch before the exam. There are no hidden charges. The fee for each course is clearly listed on our Courses page.",
    category: "General",
  },
  {
    id: "ca-inter-groups",
    question: "Can I join CA Intermediate for just one group?",
    answer:
      "Yes. We offer separate Group 1 and Group 2 batches for CA Intermediate, as well as a combined both-groups batch. Many students choose to clear one group at a time, especially while managing articleship.",
    category: "Intermediate",
  },
  {
    id: "ca-final-groups",
    question: "Can I join CA Final for just one group?",
    answer:
      "Yes. We offer separate Group 1 and Group 2 batches for CA Final. If you need to focus on specific papers, speak with our counsellors to build a customised preparation plan.",
    category: "Final",
  },
  {
    id: "revision-batch",
    question: "Is there a revision batch before the exams?",
    answer:
      "Yes. A free revision crash course is included in the course fee for all students. It covers high-weightage topics, quick-revision notes, and additional mock tests in the weeks leading up to the exam.",
    category: "General",
  },
  {
    id: "whatsapp-support",
    question: "Can I contact faculty outside class hours?",
    answer:
      "Yes. Each batch has a dedicated WhatsApp group where faculty are available for quick queries. For detailed doubts, you can schedule a one-to-one session. We believe support should not end at the classroom door.",
    category: "General",
  },
  {
    id: "ca-final-eligibility",
    question: "When can I appear for CA Final?",
    answer:
      "You can appear for CA Final after passing CA Intermediate (both groups) and completing at least 2.5 years of articleship. You must also be registered with ICAI for at least 6 months before appearing in the Final exams.",
    category: "Final",
  },
  {
    id: "icai-registration",
    question: "Do you help with ICAI registration?",
    answer:
      "Yes. Our team guides students through the entire ICAI registration process — from selecting the correct form and paying fees to submitting documents. We ensure registrations are error-free and completed on time.",
    category: "General",
  },
  {
    id: "placement-support",
    question: "Do you provide placement support after CA Final?",
    answer:
      "Yes. We provide placement and campus recruitment support for CA Final students. We have partnerships with leading CA firms and corporates who actively recruit from Delhi CA School. Students can also access career guidance sessions with our faculty.",
    category: "Final",
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
      "Delhi CA School helped me approach CA preparation with more structure. The teaching approach and practice made me more confident before the exam.",
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


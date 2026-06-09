export interface Doctor {
  id: string;
  fullName: string;
  specialty: string; // e.g. "kardiologiya"
  experience: number;
  rating: number;
  avatarUrl: string;
  bio: {
    uz: string;
    ru: string;
    en: string;
  };
  degree: {
    uz: string;
    ru: string;
    en: string;
  };
  slotsByDay: {
    [day: string]: string[]; // "Mon" -> ["09:00", "10:30", "14:00", "16:00"]
  };
}

export interface ServiceItem {
  id: string;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  category: string;
  price: number;
  duration: number; // minutes
  iconName: string; // lucide icon name
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email?: string;
  doctorId: string;
  doctorName: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  slug: string;
  summary: {
    uz: string;
    ru: string;
    en: string;
  };
  content: {
    uz: string;
    ru: string;
    en: string;
  };
  author: {
    uz: string;
    ru: string;
    en: string;
  };
  tags: string[];
  publishedAt: string;
  imageUrl: string;
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: {
    uz: string;
    ru: string;
    en: string;
  };
  doctorName: string;
  createdAt: string;
}

export type Language = "uz" | "ru" | "en";

export interface TranslationPack {
  brand: string;
  slogan: string;
  ctaBooking: string;
  ctaServices: string;
  scrollyTellingTip: string;
  
  // Phase titles
  phase1Title: string;
  phase1Desc: string;
  phase2Title: string;
  phase2Desc: string;
  phase3Title: string;
  phase3Desc: string;
  phase4Title: string;
  phase4Desc: string;
  phase5Title: string;
  phase5Desc: string;

  // Navigation / Tabs
  home: string;
  services: string;
  doctors: string;
  about: string;
  blog: string;
  contact: string;
  adminPanel: string;

  // Stats
  statPatients: string;
  statDoctors: string;
  statExperience: string;
  statSuccess: string;

  // Booking Form
  bookingTitle: string;
  bookingSubtitle: string;
  stepName: string;
  stepDetails: string;
  stepDoctor: string;
  stepDateTime: string;
  fieldFullName: string;
  fieldPhone: string;
  fieldEmail: string;
  fieldNotes: string;
  selectSpecialty: string;
  selectDoctor: string;
  selectDate: string;
  selectTime: string;
  btnNext: string;
  btnPrev: string;
  btnSubmit: string;
  bookingSuccess: string;
  bookingSuccessDesc: string;
  
  // Doctor profile details
  doctorExp: string;
  doctorDegree: string;
  bookDoctor: string;
  activeSchedules: string;

  // Process Steps
  processTitle: string;
  processSubtitle: string;
  processStep1: string;
  processStep1Desc: string;
  processStep2: string;
  processStep2Desc: string;
  processStep3: string;
  processStep3Desc: string;

  // AI Assistant Widget
  aiAssistant: string;
  aiSubtitle: string;
  aiPlaceholder: string;
  aiWelcome: string;
  aiWarning: string;

  // Footer & Copy
  allRightsReserved: string;
  tagline: string;
}

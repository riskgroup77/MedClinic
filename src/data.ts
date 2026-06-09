import { Language, TranslationPack, Doctor, ServiceItem, BlogPost, Review } from "./types";

export const translations: Record<Language, TranslationPack> = {
  uz: {
    brand: "MedClinic",
    slogan: "Futuristik Raqamli Tibbiyot Tajribasi",
    ctaBooking: "Onlayn Qabul",
    ctaServices: "Xizmatlarni Ko'rish",
    scrollyTellingTip: "Klinika olamiga kirish uchun pastga scroll qiling",
    
    phase1Title: "Klinika Intelekti",
    phase1Desc: "Database dan canvasgacha — tibbiy particle tizimlar, xavfsiz va tezkor arxitektura.",
    phase2Title: "Kuchli Ko'rsatkichlar",
    phase2Desc: "Bizning yutuqlarimiz va bemorlarga xizmat ko'rsatish tezligimiz. Har bir soniya inson hayoti uchun muhim.",
    phase3Title: "Premium Tibbiy Xizmatlar",
    phase3Desc: "Har bir yo'nalish bo'yicha zamonaviy texnologiyalar va yuqori darajada sterilizatsiyalangan muolajalar.",
    phase4Title: "Bizning Professorlar va Shifokorlar",
    phase4Desc: "Ko'p yillik tajribaga ega tibbiyot fanlari nomzodlari va xalqaro toifadagi mutaxassislar.",
    phase5Title: "Sog'lom Kelajak Onlayn Qabuli",
    phase5Desc: "Bir necha soniyada qulay vaqtni band qiling. Real-time slotlar va SMS/Email tasdiq.",

    home: "Bosh sahifa",
    services: "Xizmatlar",
    doctors: "Shifokorlar",
    about: "Biz haqimizda",
    blog: "Tibbiy Blog",
    contact: "Aloqa",
    adminPanel: "Admin Panel",

    statPatients: "Faol Bemorlar",
    statDoctors: "Malakali Shifokorlar",
    statExperience: "Klinika Tajribasi",
    statSuccess: "Muvaffaqiyatli Davolash",

    bookingTitle: "Interaktiv Shifokor Qabuli",
    bookingSubtitle: "Kerakli yo'nalish, shifokor va qulay vaqtni real vaqtda tanlang.",
    stepName: "Mutaxassislik",
    stepDetails: "Bemor Ma'lumotlari",
    stepDoctor: "Professor Shifokor",
    stepDateTime: "Sana va Vaqt",
    fieldFullName: "F.I.O. (Ism va Familiyangiz)",
    fieldPhone: "Telefon raqamingiz",
    fieldEmail: "E-pochta (ixtiyoriy)",
    fieldNotes: "Shikoyatingiz yoki qo'shimcha eslatmalar",
    selectSpecialty: "Tibbiy mutaxassislikni tanlang",
    selectDoctor: "Shifokorni tanlang",
    selectDate: "Qabul kunini tanlang",
    selectTime: "Bo'sh vaqtni tanlang",
    btnNext: "Keyingisi",
    btnPrev: "Orqaga",
    btnSubmit: "Qabulni Tasdiqlash",
    bookingSuccess: "QABUL MUVAFFAQIYATLI YARATILDI!",
    bookingSuccessDesc: "Sizning qabulingiz tizimda ro'yxatdan o'tdi. Tez fursatda shifokorimiz sizni kutib oladi.",

    doctorExp: "yil tajriba",
    doctorDegree: "Ilmiy daraja",
    bookDoctor: "Ushbu shifokorga yozilish",
    activeSchedules: "Qabul Kunlari va Soatlari",

    processTitle: "Klinika Ish Jarayoni",
    processSubtitle: "Yuqori darajadagi avtomatlashtirilgan 3 bosqichli professional yondashuv",
    processStep1: "01 · Onlayn Qayd va Aloqa",
    processStep1Desc: "Tizim yoki tibbiy AI agentimiz yordamida qulay vaqtingizni va shifokorni bir lahzada band qilasiz.",
    processStep2: "02 · Professional Ko'rik va Tahlillar",
    processStep2Desc: "Zamonaviy innovatsion texnika va robotlashtirilgan laboratoriya yordamida aniq tashxis.",
    processStep3: "03 · Effektli Davolash & Nazorat",
    processStep3Desc: "Shaxsiy shifokor rejasi, dori-darmonlarni barcha xalqaro standartlar asosida nazorat qilib borish.",

    aiAssistant: "MedClinic AI Ko'makchisi",
    aiSubtitle: "RAG Tibbiy Konsultatsiya Tizimi",
    aiPlaceholder: "Masalan: Kardiolog shifokorlar kimlar? Narxlar qanaqa?...",
    aiWelcome: "Assalomu alaykum! Men MedClinic sun'iy intellekt agentiman. Sizga klinikadagi mutaxassislarimiz, xizmat narxlari, shifokorlarimiz faoliyati va qabulga yozilish haqida batafsil ma'lumot bera olaman.",
    aiWarning: "Eslatma: AI maslahatlari shifokor ko'rigini to'liq o'rnini bosa olmaydi.",

    allRightsReserved: "Barcha huquqlar himoyalangan. Devini.io uslubida yaratildi.",
    tagline: "Stop Managing Systems. Start Managing Growth."
  },
  ru: {
    brand: "MedClinic",
    slogan: "Футуристический Опыт Цифровой Медицины",
    ctaBooking: "Онлайн Запись",
    ctaServices: "Посмотреть Услуги",
    scrollyTellingTip: "Прокрутите вниз, чтобы погрузиться в мир клиники",
    
    phase1Title: "Интеллект Клиники",
    phase1Desc: "От базы данных до холста — медицинские частицы, безопасная и сверхбыстрая архитектура.",
    phase2Title: "Мощные Показатели",
    phase2Desc: "Наши достижения и скорость обслуживания пациентов. Каждая секунда важна.",
    phase3Title: "Премиальные Услуги",
    phase3Desc: "Современные технологии и высокостерильные процедуры по каждому направлению медицины.",
    phase4Title: "Наши Профессора и Врачи",
    phase4Desc: "Кандидаты медицинских наук с многолетним стажем и специалисты международного уровня.",
    phase5Title: "Запись на Здоровое Будущее",
    phase5Desc: "Забронируйте удобное время за секунды. Слоты в реальном времени и SMS/Email подтверждения.",

    home: "Главная",
    services: "Услуги",
    doctors: "Врачи",
    about: "О нас",
    blog: "Медицинский Блог",
    contact: "Контакты",
    adminPanel: "Админ-Панель",

    statPatients: "Активных Пациентов",
    statDoctors: "Квалифицированных Врачей",
    statExperience: "Лет Опыта Клиники",
    statSuccess: "Успешных Лечений",

    bookingTitle: "Интерактивная Запись",
    bookingSubtitle: "Выберите направление, врача и удобное время в режиме реального времени.",
    stepName: "Специализация",
    stepDetails: "Данные Пациента",
    stepDoctor: "Профессор / Врач",
    stepDateTime: "Дата и Время",
    fieldFullName: "Ф.И.О. пациента",
    fieldPhone: "Номер телефона",
    fieldEmail: "Электронная почта (опционально)",
    fieldNotes: "Жалобы или дополнительные примечания",
    selectSpecialty: "Выберите медицинскую специальность",
    selectDoctor: "Выберите врача",
    selectDate: "Выберите дату приема",
    selectTime: "Выберите доступное время",
    btnNext: "Далее",
    btnPrev: "Назад",
    btnSubmit: "Подтвердить Запись",
    bookingSuccess: "ЗАПИСЬ УСПЕШНО СОЗДАНА!",
    bookingSuccessDesc: "Ваша запись успешно зарегистрирована. Наш специалист встретит вас в указанное время.",

    doctorExp: "лет опыта",
    doctorDegree: "Ученая степень",
    bookDoctor: "Записаться к этому врачу",
    activeSchedules: "Дни и Часы Приема",

    processTitle: "Процесс Работы",
    processSubtitle: "Высокоавтоматизированный 3-этапный профессиональный подход к лечению",
    processStep1: "01 · Онлайн Регистрация",
    processStep1Desc: "Быстро бронируйте время самостоятельно или с помощью нашего медицинского ИИ-агента.",
    processStep2: "02 · Профессиональный Осмотр",
    processStep2Desc: "Точный диагноз на передовом высокотехнологичном оборудовании и в роботизированной лаборатории.",
    processStep3: "03 · Лечение и Контроль",
    processStep3Desc: "Индивидуальный план лечения и мониторинг согласно строгим международным протоколам.",

    aiAssistant: "ИИ-Помощник MedClinic",
    aiSubtitle: "Медицинская Консультационная Система RAG",
    aiPlaceholder: "Например: Кто принимает в кардиологии? Какие цены?...",
    aiWelcome: "Здравствуйте! Я ИИ-ассистент клиники MedClinic. Готов проконсультировать вас по поводу наших врачей, услуг, цен и сразу помочь подобрать удобное время приема.",
    aiWarning: "Примечание: Советы ИИ не заменяют полноценный осмотр у врача.",

    allRightsReserved: "Все права защищены. Разработано в стиле Devini.io.",
    tagline: "Stop Managing Systems. Start Managing Growth."
  },
  en: {
    brand: "MedClinic",
    slogan: "Futuristic Digital Healthcare Experience",
    ctaBooking: "Online Booking",
    ctaServices: "Explore Services",
    scrollyTellingTip: "Scroll down to immerse into the Clinic universe",
    
    phase1Title: "Clinical Intelligence",
    phase1Desc: "From database to canvas — biological particle simulations, airtight logic, and next-gen performance.",
    phase2Title: "Empirical Analytics",
    phase2Desc: "Demonstrated patient care throughput and clinical milestones. Because speed saves lives.",
    phase3Title: "Premium Medical Services",
    phase3Desc: "Highly targeted clinical specialties powered by modern diagnostic systems and robotics.",
    phase4Title: "Our Chief Medical Officers",
    phase4Desc: "Internationally certified professors, researchers, and practicing medical scientists.",
    phase5Title: "Schedule a Healthy Tomorrow",
    phase5Desc: "Claim your medical slot in real-time. Automated calendars and instantly confirmed notifications.",

    home: "Home",
    services: "Services",
    doctors: "Doctors Roster",
    about: "About Us",
    blog: "Clinical Blog",
    contact: "Contact",
    adminPanel: "Admin Suite",

    statPatients: "Active Patients Registered",
    statDoctors: "Eminent Doctors",
    statExperience: "Years of Experience",
    statSuccess: "Successful Recoveries",

    bookingTitle: "Interactive Scheduling",
    bookingSubtitle: "Resolve clinical specialties, cross-reference physician schedules, and claim open slots.",
    stepName: "Specialty Selection",
    stepDetails: "Patient Information",
    stepDoctor: "Assigned Physician",
    stepDateTime: "Schedules",
    fieldFullName: "Full Name (First and Last)",
    fieldPhone: "Phone Number",
    fieldEmail: "Email Address (Optional)",
    fieldNotes: "Clinical reasons or notes",
    selectSpecialty: "Select clinic specialty",
    selectDoctor: "Assign doctor",
    selectDate: "Deconflict calendar dates",
    selectTime: "Claim hourly slot",
    btnNext: "Next",
    btnPrev: "Back",
    btnSubmit: "Authorize Booking",
    bookingSuccess: "BOOKING SUCCESSFULLY CONSTRUCTED!",
    bookingSuccessDesc: "Your clinical intake has been recorded in the register. Our medical specialists await you.",

    doctorExp: "years experience",
    doctorDegree: "Medical credentials",
    bookDoctor: "Schedule Appointment",
    activeSchedules: "Clinical Hour Availability",

    processTitle: "Operational Philosophy",
    processSubtitle: "High-throughput 3-step structured system engineered for longevity and absolute health outcomes",
    processStep1: "01 · Automated Intake & Triage",
    processStep1Desc: "Claim slots within seconds through our intuitive visual grid scheduling or clinical support agent.",
    processStep2: "02 · Empirical Screening & Diagnostics",
    processStep2Desc: "Airtight analysis via high-resolution lab diagnostics, automated assay scans, and imaging.",
    processStep3: "03 · Protocol-Driven Therapeutics",
    processStep3Desc: "Uncompromising execution of personalized medicine plans and persistent dynamic monitoring.",

    aiAssistant: "MedClinic Space Agent",
    aiSubtitle: "RAG Context-Aware Support System",
    aiPlaceholder: "e.g., Guide me to cardiologists? What are the prices?...",
    aiWelcome: "Greetings! I am the MedClinic Autonomous Clinical Support Agent. I'm equipped with comprehensive data regarding our services, physicians, pricing models, and session schedules.",
    aiWarning: "Warning: AI intelligence does not substitute actual professional checkups.",

    allRightsReserved: "All rights reserved. Engineered in the spirit of Devini.io.",
    tagline: "Stop Managing Systems. Start Managing Growth."
  }
};

export const servicesData: ServiceItem[] = [
  {
    id: "cardiology",
    category: "kardiologiya",
    name: {
      uz: "Kardiologiya",
      ru: "Кардиология",
      en: "Cardiology"
    },
    description: {
      uz: "Yurak, o'pka qon-tomirlari va butun arterial tizimni yuqori aniqlikda tekshirish va davolash.",
      ru: "Высокоточное обследование и лечение сердечно-сосудистой системы и коронарных артерий.",
      en: "Precision diagnostics and advanced care for coronary arteries and critical cardiovascular conditions."
    },
    price: 350000,
    duration: 30,
    iconName: "Heart"
  },
  {
    id: "neurology",
    category: "nevrologiya",
    name: {
      uz: "Nevrologiya",
      ru: "Неврология",
      en: "Neurology"
    },
    description: {
      uz: "Miya asab faoliyati va umurtqa pog'onasi kasalliklarini innovatsion usullar bilan barham toptirish.",
      ru: "Лечение неврологических расстройств, головных болей, инсультов и заболеваний позвоночника.",
      en: "Eradication of brain-nervous system disorders, chronic migraines, and complex spine pathology."
    },
    price: 300000,
    duration: 40,
    iconName: "Brain"
  },
  {
    id: "orthopedics",
    category: "ortopediya",
    name: {
      uz: "Ortopediya",
      ru: "Ортопедия",
      en: "Orthopedics"
    },
    description: {
      uz: "Tiz-tovon bo'g'imlari hamda tayanch-harakat tizimi shikastlanishlarini minimal-invaziv davolash.",
      ru: "Малоинвазивное лечение суставов конечностей и всего опорно-двигательного аппарата.",
      en: "Minimal-invasive arthroscopic therapies for joint wear, bone injuries, and kinetic skeletal repair."
    },
    price: 280000,
    duration: 30,
    iconName: "Bone"
  },
  {
    id: "stomatology",
    category: "stomatologiya",
    name: {
      uz: "Stomatologiya",
      ru: "Стоматология",
      en: "Dentistry"
    },
    description: {
      uz: "Badiiy restavratsiya, import-implants, dental jarrohlik hamda tishlarni zamonaviy oqartirish.",
      ru: "Художественная реставрация зубов, безболезненная имплантация и отбеливание последнего поколения.",
      en: "Esthetic smile restoration, premium titanium implants, oral surgery, and ozone whitening."
    },
    price: 250000,
    duration: 45,
    iconName: "Activity"
  },
  {
    id: "pediatrics",
    category: "pediatriya",
    name: {
      uz: "Pediatriya",
      ru: "Педиатрия",
      en: "Pediatrics"
    },
    description: {
      uz: "Go'daklar va o'spirinlarning biologik rivojlanish standartlarini chuqur nazorat qilish va davolash.",
      ru: "Комплексный контроль детского здоровья с заботой и индивидуальным подходом от ведущих врачей.",
      en: "Empirical pediatric diagnostics, immunologic monitoring, and child welfare consultation."
    },
    price: 200000,
    duration: 30,
    iconName: "Baby"
  },
  {
    id: "radiology",
    category: "radiologiya",
    name: {
      uz: "Radiologiya & MRT",
      ru: "Радиология и МРТ",
      en: "MRI & Radiology"
    },
    description: {
      uz: "Yangi avlod ultra-magnit rezonans skanerlari yordamida har qanday a'zolarning 3D tasvirini olish.",
      ru: "3D-визуализация внутренних органов на сверхточных томографах последнего поколения.",
      en: "High-resolution multi-slice computed tomography and 3T MRI structural scans."
    },
    price: 500000,
    duration: 60,
    iconName: "Radio"
  },
  {
    id: "ophthalmology",
    category: "oftalmologiya",
    name: {
      uz: "Oftalmologiya",
      ru: "Офтальмология",
      en: "Ophthalmology"
    },
    description: {
      uz: "Ko'z ko'rish qobiliyatini lazer jarrohligi (LASIK) va dori muolajalari yordamida 100% tiklash.",
      ru: "Лазерная коррекция зрения (LASIK) и терапия глазных патологий под микроскопом.",
      en: "Precision laser correction surgery (LASIK, SMILE) and advanced retinal disease management."
    },
    price: 320000,
    duration: 30,
    iconName: "Eye"
  },
  {
    id: "endocrinology",
    category: "endokrinologiya",
    name: {
      uz: "Endokrinologiya",
      ru: "Эндокринология",
      en: "Endocrinology"
    },
    description: {
      uz: "Gormonlar balansi, qalqonsimon bez modda almashinuvi hamda diabet kasalliklarini kompleks nazoratlash.",
      ru: "Комплексное ведение диабета, лечение нарушений обмена веществ и щитовидной железы.",
      en: "Comprehensive management of endocrine glands, glucose curves, thyroid function, and pituitary health."
    },
    price: 270000,
    duration: 30,
    iconName: "ShieldAlert"
  }
];

export const doctorsData: Doctor[] = [
  {
    id: "doc-ulugbekov",
    fullName: "Ulug'bekov Elyor Rustamovich",
    specialty: "kardiologiya",
    experience: 18,
    rating: 4.9,
    avatarUrl: "blue-glowing-doc",
    bio: {
      uz: "Tibbiyot fanlari nomzodi, Myunxen Kardiologiya Institutida malaka oshirgan. O'tkir infarkt va surunkali yetishmovchiliklar bo'yicha etakchi mutaxassis.",
      ru: "Кандидат медицинских наук, стажировался в Мюнхенском институте кардиологии. Ведущий эксперт по лечению инфарктов и ишемической болезни.",
      en: "PhD in Medical Sciences, practiced at Munich Heart Institute. Reputed specialist for complex bypass surgeries and post-infarction care."
    },
    degree: {
      uz: "Tibbiyot Fanlari Nomzodi (Kardioxirurg)",
      ru: "Кандидат Медицинских Наук (Кардиохирург)",
      en: "Associate Professor, PhD in Cardiology"
    },
    slotsByDay: {
      Mon: ["09:00", "09:45", "11:00", "14:00", "15:30"],
      Tue: ["09:00", "10:30", "14:00", "16:00"],
      Wed: ["09:00", "09:45", "11:00", "14:00"],
      Thu: ["10:30", "14:00", "15:00", "16:00"],
      Fri: ["09:00", "11:00", "14:00"]
    }
  },
  {
    id: "doc-karimova",
    fullName: "Karimova Feruza Baxtiyorovna",
    specialty: "nevrologiya",
    experience: 15,
    rating: 4.85,
    avatarUrl: "cyan-glowing-doc",
    bio: {
      uz: "Oliy toifali shifokor-nevrolog. Autonom nerv tizimi kasalliklarini va insultdan keyingi nevrologik reabilitatsiyani yuqori muvaffaqiyat bilan olib boradi.",
      ru: "Невролог высшей категории. Специализируется на лечении вегетативных расстройств и комплексной реабилитации после инсультов.",
      en: "Senior Clinical Neurologist. Specialized in brain stroke recovery schemas, migraine prophylaxis, and autonomic neuro-pathway blocks."
    },
    degree: {
      uz: "Oliy Toifali Shifokor-Nevropatolog",
      ru: "Невропатолог Высшей Категории",
      en: "Eminent Sc.D., Senior Clinical Neurologist"
    },
    slotsByDay: {
      Mon: ["10:00", "11:30", "14:30", "16:00"],
      Tue: ["09:30", "11:00", "15:00"],
      Thu: ["10:00", "11:30", "14:30", "16:00"],
      Fri: ["09:30", "11:00", "14:00", "15:30"]
    }
  },
  {
    id: "doc-saidov",
    fullName: "Saidov Jasur Akmalovich",
    specialty: "ortopediya",
    experience: 12,
    rating: 4.8,
    avatarUrl: "emerald-glowing-doc",
    bio: {
      uz: "Bo'g'imlarni endoprotezlash va eng murakkab travmatologik tiklash bo'yicha yetakchi mutaxassis. Dunyo bo'ylab 1500 gacha operatsiyalarni o'tkazgan.",
      ru: "Специалист по эндопротезированию крупных суставов и артроскопической хирургии. Провел более 1500 успешных операций.",
      en: "Surgical Orthopedist. Specialized in total joint arthroplasty and ligament reconstructions. Over 1,500 successful surgical interventions."
    },
    degree: {
      uz: "Oliy Toifali Travmatolog-Ortoped",
      ru: "Травматолог-Ортопед Высшей Категории",
      en: "Board-Certified Traumatologist-Orthopedist"
    },
    slotsByDay: {
      Tue: ["09:00", "10:30", "14:00", "16:00"],
      Wed: ["09:00", "10:30", "14:00", "15:30", "16:30"],
      Thu: ["09:00", "10:30", "14:00"],
      Fri: ["10:00", "11:00", "15:00", "16:00"]
    }
  },
  {
    id: "doc-tursunova",
    fullName: "Tursunova Lola Umarovna",
    specialty: "pediatriya",
    experience: 20,
    rating: 4.95,
    avatarUrl: "amber-glowing-doc",
    bio: {
      uz: "Pediatriya yo'nalishidagi 20 yillik ilmiy va amaliy tajriba sohibasi. Bolalardagi allergik va immunologik holatlarni to'liq barham toptiradi.",
      ru: "Педиатр с 20-летним стажем. Член Ассоциации детских врачей. Специализируется на лечении аллергических заболеваний и укреплении иммунитета.",
      en: "Chief Pediatric Advisor. Over 20 years of clinical practice in child allergy protocols and immunology deconfliction."
    },
    degree: {
      uz: "Professor, Tibbiyot Fanlari Doktori",
      ru: "Профессор, Доктор Медицинских Наук",
      en: "Chief Physician, Professor of Pediatrics"
    },
    slotsByDay: {
      Mon: ["13:00", "14:00", "15:00", "16:00"],
      Wed: ["09:00", "11:00", "14:00", "15:00"],
      Fri: ["09:00", "11:00", "13:00", "15:00"]
    }
  },
  {
    id: "doc-axmedov",
    fullName: "Axmedov Sardor Shavkatovich",
    specialty: "stomatologiya",
    experience: 14,
    rating: 4.9,
    avatarUrl: "violet-glowing-doc",
    bio: {
      uz: "Shveytsariyada tish implantologiyasi va estetik dental mikroskopiya bo'yicha tahsil olgan. Badiiy tish restavratsiyasi ustasi.",
      ru: "Проходил обучение в Швейцарии по имплантации зубов. Эксперт по микроскопической эстетической стоматологии и винирам.",
      en: "Master implantologist trained in Geneva. Expert in micro-dentistry, elite veneers, and full-jaw restorations."
    },
    degree: {
      uz: "Oliy Toifali Dental Implantolog",
      ru: "Стоматолог-Имплантолог Высшей Категории",
      en: "Senior Implant Surgeon, D.D.S."
    },
    slotsByDay: {
      Mon: ["09:00", "10:30", "14:00", "15:30"],
      Tue: ["09:00", "11:00", "14:00", "16:00"],
      Wed: ["09:00", "10:30", "14:00"],
      Thu: ["11:00", "14:00", "15:30", "16:30"]
    }
  },
  {
    id: "doc-nasirova",
    fullName: "Nasirova Dilbar Azimovna",
    specialty: "oftalmologiya",
    experience: 16,
    rating: 4.88,
    avatarUrl: "rose-glowing-doc",
    bio: {
      uz: "Innovatsion ko'z ko'rish lazer operatsiyalari va katarakta mini-invaziv davolash bo'yicha etakchi oftalmo-jarroh.",
      ru: "Ведущий офтальмохирург нашей клиники. Специалист по лазерной коррекции зрения и малоинвазивной хирургии катаракты.",
      en: "Senior Ophthalmic Laser Surgeon. Specialized in vitreo-retinal procedures and advanced refractive correction (LASIK/PRK)."
    },
    degree: {
      uz: "Oftalmo-Jarroh, Tibbiyot Fanlari Nomzodi",
      ru: "Офтальмохирург, Кандидат Медицинских Наук",
      en: "MD, Consultant Vitreoretinal Surgeon"
    },
    slotsByDay: {
      Mon: ["09:00", "09:45", "11:00"],
      Wed: ["13:00", "14:00", "15:00", "16:00"],
      Thu: ["09:00", "11:00", "14:00", "15:30"]
    }
  }
];

export const reviewsData: Review[] = [
  {
    id: "rev-1",
    patientName: "Asadbek Karimov",
    rating: 5,
    comment: {
      uz: "Elyor Rustamovich hayotimni saqlab qoldi! Yurak dardi bilan kelgandim, eng yuqori darajada muolaja oldim. Klinikaning onlayn tizimi ham ajoyib.",
      ru: "Эльер Рустамович спас мне жизнь! Обратился с сильными болями в сердце, оказали первоклассную помощь. Онлайн запись очень удобная.",
      en: "Dr. Elyor saved my life! Came in with acute chest pain, received cutting-edge catheter therapy. The online service and clinical flow is stellar."
    },
    doctorName: "Ulug'bekov Elyor Rustamovich",
    createdAt: "2026-05-15T09:30:00Z"
  },
  {
    id: "rev-2",
    patientName: "Malika Tursunova",
    rating: 5,
    comment: {
      uz: "Feruza opa yordamidagi nevropatologik davolanishdan so'ng 5 yildan beri qiynab kelgan kuchli bosh og'riqlari butunlay yo'qoldi! Favqulodda natija.",
      ru: "После курса лечения у Ферузы Бахтияровны полностью прошли мигрени, мучившие меня последние 5 лет! Потрясающий доктор.",
      en: "Following clinical therapy with Dr. Feruza, my recurring chronic migraines are completely eradicated. Unbelievable precision."
    },
    doctorName: "Karimova Feruza Baxtiyorovna",
    createdAt: "2026-05-20T14:15:00Z"
  },
  {
    id: "rev-3",
    patientName: "Sardor Salimov",
    rating: 5,
    comment: {
      uz: "Tish implantatsiyasi uchun kelgandim, Sardor Shavkatovich 1 soat ichida mutlaqo og'riqsiz Shveytsariya implantini o'rnatib berishdi. Juda mamnunman.",
      ru: "Приходил на имплантацию к Сардору Шавкатовичу. Зуб восстановили за один сеанс, безболезненно и качественно. Рекомендую!",
      en: "Extremely clean titanium implant process. Dr. Sardor executed it seamlessly in less than an hour with zero pain. Elite standard."
    },
    doctorName: "Axmedov Sardor Shavkatovich",
    createdAt: "2026-06-01T11:00:00Z"
  }
];

export const blogPostsData: BlogPost[] = [
  {
    id: "post-1",
    title: {
      uz: "Yurak Sog'lig'ini Saqlashning 5 Ta Muhim Innovatsion Usuli",
      ru: "5 Инновационных Способов Заботы о Здоровье Сердца",
      en: "5 Diagnostic Advancements for Coronary Artery Longevity"
    },
    slug: "yurak-sogligini-saqlash-innovatsiya",
    summary: {
      uz: "Yevropa kardiologlari tavsiyalari va yangi avlod tomografiyasi orqali yurak xurujlarini 99% oldini olish sirlari.",
      ru: "Как предотвратить инфаркт на 99% благодаря ранней томографии и советам лучших кардиологов.",
      en: "Preventing myocardial infarctions through early computed tomography coronary assays and precision cardiology protocols."
    },
    content: {
      uz: "Yurak-qon tomir kasalliklari asrimizning eng xavfli dushmanlaridan biri hisoblanadi. Zamonaviy MedClinic kardiologiyasi bugun tomografik koronaro-angiyografiya yordamida tomirlarning holatini mikron darajasida o'rganadi. Sog'lom hayot kechirish sirlari birinchi navbatda qon bosimini o'lchash emas, balki shaxsiy metabolizm chizmasi va lipid spektrini muddatli tekshirib borishdir...",
      ru: "Сердечно-сосудистые заболевания остаются главной угрозой здоровью. Сегодня в MedClinic мы применяем инновационную томографическую коронарографию для сканирования артерий с микроскопической детализацией. Секрет долголетия кроется не просто в контроле давления, а в периодическом анализе липидного спектра и составлении персонализированной карты метаболизма...",
      en: "Cardiovascular decay is a high-incidence clinical threat. Modern scanners in MedClinic allow non-invasive cross-sectional modeling of the coronary tree. Prevention hinges on metabolic screening, blood lipids profile orchestration, and computed calcium scores."
    },
    author: {
      uz: "Dr. E.R. Ulug'bekov",
      ru: "Д-р Э.Р. Улугбеков",
      en: "Dr. Elyor Ulugbekov"
    },
    tags: ["Kardiologiya", "Yurak", "MedTex", "Innovatsiyalar"],
    publishedAt: "2026-05-28T08:00:00Z",
    imageUrl: "cardio_visual"
  },
  {
    id: "post-2",
    title: {
      uz: "Autonom Nerv Tizimi Buzilishi: Simptomlar va Zamonaviy Yechimlar",
      ru: "Дисфункции Вегетативной Нервной Системы: Методы Лечения",
      en: "Autonomic Nervous System Recovery and Micro-Neural Blockade"
    },
    slug: "autonom-nerv-tizimi-kasalliklari",
    summary: {
      uz: "Keltirib chiqaruvchi stress, bosh aylanishi, surunkali charchoq hamda migrenlarni dori turlaridan tashqari bartaraf etish usullari.",
      ru: "Как справиться с хронической усталостью, головными болями и вегетососудистой дистонией современными методами.",
      en: "Navigating chronic neuro-fatigue, stress index markers, and state-of-the-art autonomic blockades."
    },
    content: {
      uz: "Surunkali charchoq, doimiy asabiylashish va asossiz yuz beradigan yurak urish holatlari asosan asab tizimining vegetativ qismining diskorrelyatsiyasi belgilaridir. Klinikamizda biz har bir bemor uchun asab to'lqinlari o'tkazuvchanligini o'lchab (MioGrafiya), asab tugunlarini o'ta samarali tibbiy blokada va zamonaviy reabilitatsiya bilan stimulyatsiya qilib davolaymiz...",
      ru: "Хроническая усталость, тревожность и перепады давления часто указывают на расстройство вегетативной нервной системы. В MedClinic мы проводим электромиографическое картирование нервных волокон и применяем высокоэффективную микронейрональную терапию...",
      en: "Unidentified systemic migraine, orthostatic dizziness, and chronic exhaustion map directly to autonomic pathway dysfunction. Our diagnostic protocols employ advanced electromyography alongside targeted neuro-receptor modular blockers..."
    },
    author: {
      uz: "Dr. F.B. Karimova",
      ru: "Д-р Ф.Б. Каримова",
      en: "Dr. Feruza Karimova"
    },
    tags: ["Nevrologiya", "Stress", "MioGrafiya", "Miya"],
    publishedAt: "2026-06-03T10:30:00Z",
    imageUrl: "neuro_visual"
  }
];

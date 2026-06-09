import { useState, useEffect } from "react";
import { 
  Heart, Brain, Bone, Activity, Baby, Radio, Eye, ShieldAlert, 
  Award, User, Phone, CheckCircle2, Shield, Calendar, Clock, 
  MapPin, ExternalLink, Sparkles, MessageSquare, ChevronRight, 
  Menu, X, ArrowDown, Database, Star, Check 
} from "lucide-react";
import { Language, Doctor, ServiceItem } from "./types";
import { translations, servicesData, doctorsData, blogPostsData, reviewsData } from "./data";
import ParticleBackground from "./components/ParticleBackground";
import MedicalAgent from "./components/MedicalAgent";
import BookingModal from "./components/BookingModal";
import AdminPanel from "./components/AdminPanel";

// Custom count up animation node
function CountUp({ end, suffix = "", duration = 1500 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const totalFrames = duration / 16;
    const increment = end / totalFrames;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span className="font-mono">{count}{suffix}</span>;
}

export default function App() {
  const [language, setLanguage] = useState<Language>("uz");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [preselectedDocId, setPreselectedDocId] = useState<string | null>(null);
  
  // Mobile navigation trigger
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Selected category filter for services section
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const t = translations[language];

  // Listener to compute scroll progress cleanly across platforms
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = window.scrollY / scrollHeight;
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openBookingWithDoctor = (docId: string) => {
    setPreselectedDocId(docId);
    setShowBooking(true);
  };

  const openBookingGeneral = () => {
    setPreselectedDocId(null);
    setShowBooking(true);
  };

  // Maps category code with visual Lucide icon component
  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Heart": return <Heart className="w-5 h-5 text-rose-400" />;
      case "Brain": return <Brain className="w-5 h-5 text-purple-400" />;
      case "Bone": return <Bone className="w-5 h-5 text-amber-400" />;
      case "Baby": return <Baby className="w-5 h-5 text-emerald-400" />;
      case "Radio": return <Radio className="w-5 h-5 text-blue-450" />;
      case "Eye": return <Eye className="w-5 h-5 text-cyan-400" />;
      case "ShieldAlert": return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      default: return <Activity className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="relative min-h-screen text-slate-150 font-sans selection:bg-blue-500/30 selection:text-white antialiased overflow-x-hidden">
      
      {/* 60fps molecular particle canvas rigged to scroll ticks */}
      <ParticleBackground scrollProgress={scrollProgress} />

      {/* FIXED GLOBAL HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/40 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand mimicking premium devini feel */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-teal-500 flex items-center justify-center p-3 relative shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-all duration-300">
              <Activity className="text-white w-5 h-5 animate-pulse" />
              <div className="absolute inset-0 rounded-xl border border-white/20 animate-ping opacity-15"></div>
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-wider text-white bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-450">{t.brand}</span>
              <p className="text-[9px] text-brand-cyan uppercase tracking-widest font-mono font-medium leading-none mt-0.5">Premium Digital Clinique</p>
            </div>
          </a>

          {/* Desktop Nav Actions */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-350">
            <a href="#" className="hover:text-white transition-colors">{t.home}</a>
            <a href="#services-block" className="hover:text-white transition-colors">{t.services}</a>
            <a href="#doctors-block" className="hover:text-white transition-colors">{t.doctors}</a>
            <a href="#process-block" className="hover:text-white transition-colors">{t.about}</a>
            <a href="#blog-block" className="hover:text-white transition-colors">{t.blog}</a>
          </nav>

          {/* Right Header Panel: Languages + Booking Trigger + Secret Admin Switch */}
          <div className="hidden sm:flex items-center gap-4">
            
            {/* Multi-language Selector */}
            <div className="flex bg-slate-900Item w-fit h-9 bg-slate-900/40 p-1 rounded-lg border border-slate-800 text-xs font-semibold select-none font-sans">
              {(["uz", "ru", "en"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-md cursor-pointer uppercase transition-all duration-200 ${
                    language === lang 
                      ? "bg-blue-600/30 text-brand-cyan border border-blue-500/25" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Secret Operational Cockpit Entrance */}
            <button
              onClick={() => setShowAdmin(true)}
              className="p-2 rounded-lg bg-slate-900/50 border border-white/5 hover:border-blue-500/30 text-slate-450 hover:text-blue-400 transition-all text-xs flex items-center gap-1.5 cursor-pointer font-sans font-medium"
              title="Admin Panel - View appointments"
            >
              <Database className="w-4 h-4 text-blue-400" />
              <span>{t.adminPanel}</span>
            </button>

            {/* Primary Slogan Booking CTA */}
            <button
              onClick={openBookingGeneral}
              className="px-5 py-2 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider cursor-pointer active:scale-95 transition-all shadow-md shadow-blue-500/10 hover:shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:border-blue-500/30"
            >
              {t.ctaBooking}
            </button>
          </div>

          {/* Mobile hamburger navigation */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Minimal Language selector */}
            <button
              onClick={() => setLanguage(language === "uz" ? "ru" : language === "ru" ? "en" : "uz")}
              className="px-2 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-brand-cyan uppercase cursor-pointer"
            >
              {language}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 border-b border-white/5 p-4 space-y-3.5 text-center text-xs font-bold uppercase tracking-wider animate-in slide-in-from-top-4 duration-300">
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300">{t.home}</a>
            <a href="#services-block" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300">{t.services}</a>
            <a href="#doctors-block" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300">{t.doctors}</a>
            <a href="#process-block" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300">{t.about}</a>
            <a href="#blog-block" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300">{t.blog}</a>
            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowAdmin(true);
                }}
                className="py-1.5 px-4 rounded bg-slate-900 text-blue-400 text-[10px] uppercase font-mono tracking-wider border border-white/5 flex items-center gap-1 mx-auto"
              >
                <Database className="w-3 h-3" />
                {t.adminPanel}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingGeneral();
                }}
                className="py-2.5 px-6 rounded-xl bg-blue-600 text-white shadow-lg w-full max-w-xs block font-display mx-auto uppercase"
              >
                {t.ctaBooking}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* PHASE 1: HERO VIEWPORT SCREEN (0–15% scroll) */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-4 overflow-hidden">
        
        {/* Cinematic content container */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Floating brand banner */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan font-bold">
                Enterprise Premium Patient Experience
              </span>
            </div>

            {/* High visual display heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tighter text-white leading-1 border-slate-900 pb-1">
                {t.brand}
              </h1>
              <p className="text-lg sm:text-2xl font-sans tracking-wide text-cyan-300 font-light max-w-xl">
                {t.slogan}
              </p>
            </div>

            {/* Cinematic overlay quote */}
            <p className="text-sm leading-relaxed text-slate-400 max-w-lg font-sans">
              {t.phase1Desc}
            </p>

            {/* Controls row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={openBookingGeneral}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-650 hover:from-blue-600 hover:to-indigo-550 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-blue-500/10 hover:shadow-[0_0_25px_rgba(0,102,255,0.4)] active:scale-95"
              >
                {t.ctaBooking}
              </button>
              
              <a
                href="#services-block"
                className="px-7 py-4 rounded-xl glass-panel hover:bg-white/5 border border-white/5 hover:border-slate-800 text-white text-xs font-bold uppercase tracking-widest transition-all"
              >
                {t.ctaServices}
              </a>
            </div>

            {/* Animated scrollytelling tip */}
            <div className="pt-8 flex items-center gap-3 animate-pulse text-slate-500 select-none">
              <ArrowDown className="w-4 h-4 text-brand-cyan" />
              <span className="text-[10px] font-mono tracking-widest uppercase">{t.scrollyTellingTip}</span>
            </div>

          </div>

          {/* Cinematic 3D Clinical Cross wireframe representation (Pure CSS 3D matrix rotation render) */}
          <div className="lg:col-span-5 flex items-center justify-center relative p-8 select-none">
            
            {/* Glowing neon halo backing coordinates */}
            <div className="absolute w-72 h-72 rounded-full bg-blue-500/5 filter blur-3xl pulse-glow-ring pointer-events-none"></div>
            
            {/* CSS 3D Space viewport */}
            <div className="relative w-64 h-64 flex items-center justify-center" style={{ perspective: "1000px" }}>
              <div className="w-48 h-48 animate-wireframe relative flex items-center justify-center">
                
                {/* 3D Vertical Pillar */}
                <div className="absolute w-12 h-44 bg-blue-600/15 border border-blue-400/40 shadow-[0_0_30px_rgba(0,102,255,0.15)] rounded-lg transform-style preserve-3d" />
                <div className="absolute w-12 h-44 bg-cyan-600/15 border border-cyan-400/40 shadow-[0_0_30px_rgba(0,200,255,0.15)] rounded-lg transform-style preserve-3d rotate-Y-90" />
                
                {/* 3D Horizontal Pillar */}
                <div className="absolute w-44 h-12 bg-blue-600/15 border border-blue-400/40 shadow-[0_0_30px_rgba(0,102,255,0.15)] rounded-lg transform-style preserve-3d" />
                <div className="absolute w-44 h-12 bg-cyan-600/15 border border-cyan-400/40 shadow-[0_0_30px_rgba(0,200,255,0.15)] rounded-lg transform-style preserve-3d rotate-X-90" />
                
                {/* Molecular floating nuclei nodes */}
                <div className="absolute top-0 w-3 h-3 bg-emerald-400 rounded-full border border-white shadow-[0_0_15px_#00FF99]" />
                <div className="absolute bottom-0 w-3 h-3 bg-blue-400 rounded-full border border-white shadow-[0_0_15px_#0066FF]" />
                <div className="absolute left-0 w-3 h-3 bg-cyan-450 rounded-full border border-white shadow-[0_0_15px_#00C8FF]" />
                <div className="absolute right-0 w-3 h-3 bg-violet-400 rounded-full border border-white shadow-[0_0_15px_#8B5CF6]" />
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* PHASE 2: EMPIRICAL ANALYTICS (15–30% scroll) */}
      <section className="relative py-24 px-4 bg-slate-950/45 border-y border-white/5">
        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] text-brand-cyan tracking-widest font-mono uppercase font-bold">{t.phase2Title}</span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">{t.brand} Emperical Indices</h2>
            <p className="text-xs text-slate-400 font-sans">{t.phase2Desc}</p>
          </div>

          {/* Grid Layout of 4 countup key values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {[
              { id: "stat-1", amount: 45000, suffix: "+", label: t.statPatients, color: "text-blue-400", bg: "border-blue-500/10" },
              { id: "stat-2", amount: 40, suffix: "+", label: t.statDoctors, color: "text-cyan-400", bg: "border-cyan-500/10" },
              { id: "stat-3", amount: 15, suffix: "+", label: t.statExperience, color: "text-purple-400", bg: "border-purple-500/10" },
              { id: "stat-4", amount: 95, suffix: "%", label: t.statSuccess, color: "text-emerald-400", bg: "border-emerald-500/10" }
            ].map((stat) => (
              <div 
                key={stat.id}
                className={`p-6 rounded-2xl glass-panel border ${stat.bg} flex flex-col items-center justify-center text-center space-y-2 relative group hover:-translate-y-1 transition-all duration-300`}
              >
                <span className={`text-3xl sm:text-4xl font-display font-extrabold ${stat.color}`}>
                  <CountUp end={stat.amount} suffix={stat.suffix} />
                </span>
                <span className="text-xs text-slate-400 tracking-wide font-sans">{stat.label}</span>
                <span className="absolute bottom-1 right-2 text-[9px] text-slate-700 font-mono select-none">SYS_OK</span>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* PHASE 3: PREMIUM MEDICAL SERVICES (30–55% scroll) */}
      <section id="services-block" className="relative py-28 px-4">
        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2.5 max-w-xl">
              <span className="text-[10px] text-brand-cyan tracking-widest font-mono uppercase font-bold">{t.phase3Title}</span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">Enterprise Clinical Excellence</h2>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{t.phase3Desc}</p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/40 rounded-xl border border-white/5 w-fit h-fit text-[11px] font-sans">
              {[
                { key: "all", label: language === "uz" ? "Barchasi" : language === "ru" ? "Все" : "All Specialties" },
                { key: "kardiologiya", label: language === "uz" ? "Kardiologiya" : language === "ru" ? "Кардиология" : "Cardiology" },
                { key: "nevrologiya", label: language === "uz" ? "Nevrologiya" : language === "ru" ? "Неврология" : "Neurology" },
                { key: "ortopediya", label: language === "uz" ? "Ortopediya" : language === "ru" ? "Ортопедия" : "Orthopedics" }
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                    selectedCategory === cat.key
                      ? "bg-blue-650 text-white font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid list of services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData
              .filter(s => selectedCategory === "all" || s.category === selectedCategory)
              .map((service) => (
                <div
                  key={service.id}
                  className="p-6 rounded-2xl glass-panel border border-slate-850 hover:border-blue-500/40 bg-slate-900/10 hover:bg-slate-900/30 transition-all duration-300 relative group flex flex-col justify-between hover:shadow-[0_0_25px_rgba(0,102,255,0.08)]"
                >
                  <div className="space-y-4">
                    {/* Visual icon badge */}
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all shrink-0">
                      {renderServiceIcon(service.iconName)}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-white text-sm tracking-wide group-hover:text-blue-400 transition-colors">
                        {service.name[language]}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                        {service.description[language]}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-550 block font-mono uppercase tracking-wider">Muolaja narxi</span>
                      <span className="text-[11px] text-emerald-450 font-mono font-medium">{service.price.toLocaleString()} UZS</span>
                    </div>

                    <button
                      onClick={openBookingGeneral}
                      className="p-1.5 rounded-lg text-slate-400 group-hover:text-cyan-300 hover:bg-white/5 transition-all cursor-pointer"
                      title={t.ctaBooking}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </section>

      {/* PHASE 4: OPERATIONAL TIMELINE (Timeline format / Devini Process) */}
      <section id="process-block" className="relative py-24 px-4 bg-slate-950/45 border-y border-white/5">
        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2.5">
            <span className="text-[10px] text-brand-cyan tracking-widest font-mono uppercase font-bold">{t.processTitle}</span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">{t.processSubtitle}</h2>
          </div>

          {/* Connected timeline steps representation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Background alignment line */}
            <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-emerald-400/20 z-0" />

            {[
              { title: t.processStep1, desc: t.processStep1Desc, color: "from-blue-500 to-indigo-600", glowing: "shadow-blue-500/10" },
              { title: t.processStep2, desc: t.processStep2Desc, color: "from-cyan-500 to-blue-500", glowing: "shadow-cyan-500/10" },
              { title: t.processStep3, desc: t.processStep3Desc, color: "from-emerald-500 to-teal-500", glowing: "shadow-emerald-500/10" }
            ].map((step, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl glass-panel relative z-10 flex flex-col items-center text-center space-y-4 group hover:-translate-y-1 transition-all duration-300 pointer-events-auto"
              >
                {/* Numeric indicator */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.color} shadow-lg ${step.glowing} flex items-center justify-center font-display font-extrabold text-lg text-white`}>
                  0{index + 1}
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-bold text-white text-sm tracking-wide">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{step.desc}</p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* PHASE 5: DOCTORS ROSTER SEKTSIYA (55–75% scroll) */}
      <section id="doctors-block" className="relative py-28 px-4">
        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2.5 animate-in">
            <span className="text-[10px] text-brand-cyan tracking-widest font-mono uppercase font-bold">{t.phase4Title}</span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">Chief Clinical Officers</h2>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">{t.phase4Desc}</p>
          </div>

          {/* Doctor profiles list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctorsData.map((doc) => (
              <div 
                key={doc.id}
                className="p-6 rounded-3xl bg-slate-900/10 border border-slate-850 hover:border-blue-500/30 glass-panel flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,102,255,0.06)] relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Doctor Avatar mock with custom styling */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-950/80 border border-slate-850 flex items-center justify-center relative overflow-hidden group-hover:scale-102 transition-all">
                      <User className="w-8 h-8 text-blue-400" />
                      <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-500 border border-slate-950 rounded-full animate-bounce"></span>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-sm tracking-wide">{doc.fullName}</h4>
                      <p className="text-xs text-cyan-400 font-sans mt-0.5">{doc.degree[language]}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-brand-cyan bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-md font-mono">
                          ★ {doc.rating}
                        </span>
                        <span className="text-[9px] text-slate-500 uppercase font-mono tracking-wider">
                          {doc.experience} {t.doctorExp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {doc.bio[language]}
                  </p>
                </div>

                {/* Booking link for this specific doctor */}
                <div className="pt-6 mt-6 border-t border-white/5">
                  <button
                    onClick={() => openBookingWithDoctor(doc.id)}
                    className="w-full py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-650 text-blue-400 hover:text-white font-semibold text-xs border border-blue-500/20 hover:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    {t.bookDoctor}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PHASE 6: INTEL CLINICAL NEWS / BLOG & SOCIAL PROOF */}
      <section className="relative py-24 px-4 bg-slate-950/45 border-t border-white/5">
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Reviews loop carousel list */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] text-emerald-450 tracking-widest font-mono uppercase font-bold">HUMAN TESTIMONIALS</span>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">Bemorlarimiz Izohlari</h3>
            </div>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500/10">
              {reviewsData.map((rev) => (
                <div 
                  key={rev.id}
                  className="p-4 rounded-xl border border-white/5 bg-slate-900/10 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-xs block">{rev.patientName}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 text-cyan-400 fill-cyan-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans italic">
                    "{rev.comment[language]}"
                  </p>
                  <span className="text-[9px] text-slate-550 block font-mono">{rev.doctorName} bemorlari</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinic Articles feed */}
          <div id="blog-block" className="lg:col-span-7 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] text-brand-blue tracking-widest font-mono uppercase font-bold">CLINICAL DISCOVERIES</span>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">Tibbiy Akademik Maqolalar</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {blogPostsData.map((post) => (
                <div 
                  key={post.id}
                  className="p-5 rounded-2xl border border-white/5 bg-slate-900/10 space-y-4 hover:border-blue-500/30 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1 text-[9px] text-blue-400 uppercase font-mono tracking-widest">
                      {post.author[language]}
                    </span>
                    <h4 className="font-semibold text-white text-xs group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title[language]}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans line-clamp-3">
                      {post.summary[language]}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-3 border-t border-white/5">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] text-slate-550 font-mono tracking-tight">#{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CORE CONTACT MAP COORDINATES MOCK */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border border-white/5 p-6 rounded-2xl glass-panel">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/5 border border-cyan-400/10 rounded-full">
              <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-300">Live coordinates</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">Sizni Klinikada Kutib Olamiz</h3>
            <p className="text-xs text-slate-450 leading-relaxed font-sans">
              Bizning barcha klinika yo'nalishlarimiz va steril operatsiyaxonalarimiz xalqaro JCI sertifikatiga ega. Koordinata buyrug'i orqali bevosita xaritadan toping.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-300">Amir Temur ko'chasi 77-uy, Toshkent, O'zbekiston</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300 font-mono">+998 (71) 200-77-77</span>
              </div>
            </div>
          </div>

          {/* Atmospheric grid mock of maps */}
          <div className="relative h-48 rounded-xl bg-slate-950 border border-slate-850 overflow-hidden flex flex-col items-center justify-center text-center p-6 select-none font-mono text-[10px]">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,102,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,102,255,0.04)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
            
            <div className="relative z-10 space-y-2">
              <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-ping mx-auto"></div>
              <h5 className="text-xs text-white font-semibold">TASHKENT_YUNUSOBOD_M1</h5>
              <p className="text-slate-600">LAT: 41.311081 | LNG: 69.240562</p>
              
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="no-referrer"
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-blue-400 hover:bg-blue-650 hover:text-white transition-all font-sans cursor-pointer"
              >
                Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* CORE FOOTER */}
      <footer className="relative py-12 px-4 border-t border-white/5 bg-slate-950/70 z-10 text-center text-xs text-slate-500 space-y-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-display font-extrabold text-base text-white tracking-widest block">{t.brand}</span>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-mono font-medium">{t.tagline}</p>
          </div>

          <p className="max-w-md text-[10px] text-slate-600 leading-relaxed sm:text-right">
            Sog'liqni Saqlash Vazirligi litsenziyasi: №041285. MedClinic {t.allRightsReserved}
          </p>

        </div>
      </footer>

      {/* RAG MEDICAL ASSISTANT WIDGET */}
      <MedicalAgent currentLanguage={language} onOpenBooking={openBookingGeneral} />

      {/* MODAL: APPOINTMENT SCHEDULER WIZARD */}
      {showBooking && (
        <BookingModal 
          currentLanguage={language} 
          onClose={() => setShowBooking(false)} 
          initialDoctorId={preselectedDocId}
        />
      )}

      {/* MODAL: ADMIN FLIGHT DECK */}
      {showAdmin && (
        <AdminPanel 
          currentLanguage={language} 
          onClose={() => setShowAdmin(false)} 
        />
      )}

    </div>
  );
}

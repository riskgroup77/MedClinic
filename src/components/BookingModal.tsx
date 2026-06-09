import React, { useState, useEffect } from "react";
import { 
  X, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle, 
  Stethoscope, ShieldAlert, Award, Sparkles, ChevronRight, ChevronLeft, Ticket
} from "lucide-react";
import { Language, Doctor, ServiceItem, Appointment } from "../types";
import { translations, servicesData, doctorsData } from "../data";

interface BookingModalProps {
  currentLanguage: Language;
  onClose: () => void;
  initialDoctorId?: string | null;
}

type StepType = "specialty" | "doctor" | "datetime" | "details" | "success";

export default function BookingModal({ currentLanguage, onClose, initialDoctorId }: BookingModalProps) {
  const [step, setStep] = useState<StepType>("specialty");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  // Intake form data
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  const t = translations[currentLanguage];

  // If initial doctor is specified, pre-select details
  useEffect(() => {
    if (initialDoctorId) {
      const doc = doctorsData.find(d => d.id === initialDoctorId);
      if (doc) {
        setSelectedSpecialty(doc.specialty);
        setSelectedDoctor(doc);
        setStep("datetime");
      }
    }
  }, [initialDoctorId]);

  // Generate next 5 calendar dates (excluding weekends Sat/Sun)
  const getDates = () => {
    const list = [];
    const now = new Date();
    // Start from tomorrow
    let current = new Date(now);
    current.setDate(now.getDate() + 1);

    while (list.length < 5) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) { // Skip Sat (6) and Sun (0)
        list.push({
          raw: current.toISOString().split("T")[0],
          dayName: current.toLocaleDateString(currentLanguage === "uz" ? "uz-UZ" : currentLanguage === "ru" ? "ru-RU" : "en-US", { weekday: "short" }),
          dayNum: current.getDate(),
          month: current.toLocaleDateString(currentLanguage === "uz" ? "uz-UZ" : currentLanguage === "ru" ? "ru-RU" : "en-US", { month: "short" }),
          dayKey: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day]
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return list;
  };

  const dates = getDates();

  // Active time slots de-confliction
  const getAvailableSlots = () => {
    if (!selectedDoctor || !selectedDate) return [];
    
    // De-conflict date raw key with doctor slotsByDay
    const dateObj = dates.find(d => d.raw === selectedDate);
    if (!dateObj) return [];

    const weekDay = dateObj.dayKey; // e.g. "Mon"
    return selectedDoctor.slotsByDay[weekDay] || [];
  };

  const availableSlots = getAvailableSlots();

  // Filter doctors by specialty
  const filteredDoctors = doctorsData.filter(d => d.specialty === selectedSpecialty);

  const handleSelectSpecialty = (spec: string) => {
    setSelectedSpecialty(spec);
    // Reset secondary values
    if (selectedDoctor && selectedDoctor.specialty !== spec) {
      setSelectedDoctor(null);
      setSelectedDate("");
      setSelectedTime("");
    }
    setStep("doctor");
  };

  const handleSelectDoctor = (doc: Doctor) => {
    setSelectedDoctor(doc);
    setSelectedDate("");
    setSelectedTime("");
    setStep("datetime");
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim() || !selectedDoctor || !selectedSpecialty || !selectedDate || !selectedTime) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          phone,
          email,
          doctorId: selectedDoctor.id,
          serviceId: selectedSpecialty, // Mapping specialty directly as service trigger
          date: selectedDate,
          time: selectedTime,
          notes
        })
      });

      if (!response.ok) {
        throw new Error("Intake registration failed.");
      }

      const appointment = await response.json();
      setCreatedAppointment(appointment);
      setStep("success");
    } catch (err) {
      console.error(err);
      alert(currentLanguage === "uz" ? "Xatolik yuz berdi" : "Произошла ошибка");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Main glass box */}
      <div 
        id="schedule-booking-overlay"
        className="relative w-full max-w-2xl bg-slate-900/65 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-2xl shadow-blue-500/5 flex flex-col max-h-[90vh] overflow-hidden z-10 transition-all scale-100 ease-out"
      >
        {/* Glowing border effects */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />

        {/* Modal Header */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-semibold text-lg text-white font-sans tracking-wide">{t.bookingTitle}</h3>
            <p className="text-xs text-slate-400 font-sans">{t.bookingSubtitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress indicators */}
        {step !== "success" && (
          <div className="px-5 py-3 bg-slate-950/40 border-b border-white/5 flex gap-2 overflow-x-auto select-none">
            {[
              { id: "specialty", label: t.stepName, index: 1 },
              { id: "doctor", label: t.stepDoctor, index: 2 },
              { id: "datetime", label: t.stepDateTime, index: 3 },
              { id: "details", label: t.stepDetails, index: 4 }
            ].map((s) => {
              const isActive = step === s.id;
              const isPast = 
                (step === "doctor" && s.id === "specialty") ||
                (step === "datetime" && ["specialty", "doctor"].includes(s.id)) ||
                (step === "details" && ["specialty", "doctor", "datetime"].includes(s.id));

              return (
                <div 
                  key={s.id} 
                  className={`flex items-center gap-2 pr-4 shrink-0 border-r border-white/5 last:border-0`}
                >
                  <span className={`w-5 h-5 rounded-md text-[10px] font-mono flex items-center justify-center border transition-all ${
                    isActive 
                      ? "bg-blue-600/20 border-blue-500 text-blue-400" 
                      : isPast
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : "bg-slate-900 border-slate-800 text-slate-500"
                  }`}>
                    {s.index}
                  </span>
                  <span className={`text-[11px] font-medium font-sans ${
                    isActive ? "text-white" : isPast ? "text-emerald-400/80" : "text-slate-500"
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic Step Content view */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-blue-500/10">
          
          {/* STEP 1: Medical Specialties */}
          {step === "specialty" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h4 className="text-sm font-medium text-slate-300">{t.selectSpecialty}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicesData.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleSelectSpecialty(service.category)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 group bg-slate-900/40 ${
                      selectedSpecialty === service.category 
                        ? "border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/5" 
                        : "border-slate-800 hover:border-slate-700 hover:bg-slate-800/20"
                    }`}
                  >
                    <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/10 group-hover:bg-blue-500/20 transition-all shrink-0">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white text-sm tracking-wide group-hover:text-blue-400 transition-colors">
                        {service.name[currentLanguage]}
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {service.description[currentLanguage]}
                      </p>
                      <span className="inline-block mt-2 text-[10px] text-cyan-400 uppercase font-mono tracking-wider bg-cyan-400/15 px-2 py-0.5 rounded-md">
                        {service.price.toLocaleString()} UZS
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Doctor/Physicians roster */}
          {step === "doctor" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-slate-300">{t.selectDoctor}</h4>
                <button 
                  onClick={() => setStep("specialty")}
                  className="text-xs text-blue-400 flex items-center gap-1 hover:underline"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> {t.btnPrev}
                </button>
              </div>

              <div className="space-y-3">
                {filteredDoctors.length === 0 ? (
                  <div className="text-center p-8 bg-slate-950/40 rounded-xl border border-dashed border-slate-800">
                    <p className="text-sm text-slate-500">Bu yo'nalishda shifokorlar mavjud emas.</p>
                  </div>
                ) : (
                  filteredDoctors.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => handleSelectDoctor(doc)}
                      className={`w-full p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col md:flex-row md:items-center gap-4 bg-slate-900/40 ${
                        selectedDoctor?.id === doc.id
                          ? "border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/5"
                          : "border-slate-800 hover:border-slate-700 hover:bg-slate-800/20"
                      }`}
                    >
                      {/* Avatar glow styling representing WebGL doc visual */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-slate-800 to-slate-950 border border-slate-700 flex items-center justify-center shrink-0 relative overflow-hidden group">
                        <User className="w-6 h-6 text-slate-400" />
                        <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-500 border border-slate-950 rounded-full"></span>
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className="font-semibold text-white text-sm tracking-wide">{doc.fullName}</h5>
                          <span className="text-[10px] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full font-mono">
                            ★ {doc.rating}
                          </span>
                        </div>
                        <p className="text-xs text-blue-400 font-sans flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 shrink-0" />
                          {doc.degree[currentLanguage]}
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                          {doc.bio[currentLanguage]}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">
                          {doc.experience} {t.doctorExp}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Calendars Schedules & Slots */}
          {step === "datetime" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-300">{t.activeSchedules}</h4>
                <button 
                  onClick={() => setStep("doctor")}
                  className="text-xs text-blue-400 flex items-center gap-1 hover:underline"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> {t.btnPrev}
                </button>
              </div>

              {/* Date Cards */}
              <div className="space-y-3">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-sans">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  {t.selectDate}
                </span>

                <div className="grid grid-cols-5 gap-2 select-none">
                  {dates.map((d, index) => {
                    const isSelected = selectedDate === d.raw;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedDate(d.raw);
                          setSelectedTime(""); // Reset time on changing date
                        }}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                          isSelected 
                            ? "border-blue-500 bg-blue-500/15 text-white" 
                            : "border-slate-800 hover:border-slate-700 bg-slate-900/40 text-slate-300"
                        }`}
                      >
                        <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">{d.dayName}</span>
                        <span className="text-base font-bold my-0.5">{d.dayNum}</span>
                        <span className="text-[10px] font-sans text-slate-400">{d.month}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hourly Slot selection */}
              {selectedDate && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5 font-sans">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    {t.selectTime}
                  </span>

                  {availableSlots.length === 0 ? (
                    <div className="p-5 text-center bg-slate-950/40 border border-slate-800 rounded-xl">
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Kechirasiz, tanlangan sanada shifokor qabuli soatlari nihoyasiga yetgan yoki ish kuni emas. Boshqa sanani tanlab ko'ring!
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {availableSlots.map((slot, i) => {
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedTime(slot)}
                            className={`p-2.5 rounded-lg border text-center text-xs font-mono tracking-wide cursor-pointer transition-all ${
                              isSelected
                                ? "border-cyan-500 bg-cyan-500/15 text-cyan-300"
                                : "border-slate-800 bg-slate-900/40 hover:border-slate-700 text-slate-300"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation button */}
              {selectedDate && selectedTime && (
                <div className="pt-2 animate-in slide-in-from-bottom-2 duration-300">
                  <button
                    onClick={() => setStep("details")}
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-550 text-white font-semibold text-sm cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10"
                  >
                    {t.btnNext}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Personal Details Form */}
          {step === "details" && (
            <form onSubmit={handleSubmitBooking} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-300">{t.stepDetails}</h4>
                <button 
                  type="button"
                  onClick={() => setStep("datetime")}
                  className="text-xs text-blue-400 flex items-center gap-1 hover:underline"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> {t.btnPrev}
                </button>
              </div>

              {/* Patient details */}
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-sans flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    {t.fieldFullName} *
                  </label>
                  <input 
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Masalan: Jamshid Alimov"
                    className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-blue-500/70 shrink-0 text-slate-200 rounded-xl text-xs outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-sans flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-blue-400" />
                      {t.fieldPhone} *
                    </label>
                    <input 
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-blue-500/70 text-slate-200 rounded-xl text-xs outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-sans flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      {t.fieldEmail}
                    </label>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alimov@example.com"
                      className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-blue-500/70 text-slate-200 rounded-xl text-xs outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-sans flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    {t.fieldNotes}
                  </label>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Bezovta qilayotgan simptomlar..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-blue-500/70 text-slate-200 rounded-xl text-xs outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Review summary index box */}
              <div className="p-4 bg-slate-950/50 border border-slate-850 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-slate-500">{t.stepDoctor}:</span>
                  <span className="text-white font-medium">{selectedDoctor?.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t.stepDateTime}:</span>
                  <span className="text-cyan-400 font-mono font-medium">{selectedDate} @ {selectedTime}</span>
                </div>
              </div>

              {/* Authorized Submission */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    {t.btnSubmit}
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 5: Success Landing */}
          {step === "success" && createdAppointment && (
            <div className="text-center py-8 space-y-5 animate-in zoom-in-95 duration-400">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-inner shadow-emerald-500/5 relative">
                <div className="absolute inset-0 rounded-full border border-emerald-500/25 animate-ping opacity-25"></div>
                <Sparkles className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-emerald-400 text-lg tracking-wider font-sans uppercase">
                  {t.bookingSuccess}
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  {t.bookingSuccessDesc}
                </p>
              </div>

              {/* Recipient badge details */}
              <div className="max-w-md mx-auto p-4 bg-slate-950 border border-emerald-500/20 rounded-xl space-y-2.5 text-left text-xs">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <Ticket className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-[10px] text-slate-500">TICKET ID: {createdAppointment.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-400">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Bemor:</span>
                    <span className="text-white text-xs">{createdAppointment.patientName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Telefon:</span>
                    <span className="text-white font-mono text-xs">{createdAppointment.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Shifokor:</span>
                    <span className="text-white text-xs">{createdAppointment.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Bo'sh vaqt:</span>
                    <span className="text-cyan-400 font-mono text-xs">{createdAppointment.date} ({createdAppointment.time})</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-semibold cursor-pointer transition-all"
                >
                  Yopish (Close)
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

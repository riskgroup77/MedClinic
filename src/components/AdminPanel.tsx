import { useState, useEffect } from "react";
import { X, RefreshCw, Check, Ban, Eye, Database, Calendar, Clock, Phone, Mail, FileText, CheckCircle2 } from "lucide-react";
import { Language, Appointment } from "../types";
import { translations } from "../data";

interface AdminPanelProps {
  currentLanguage: Language;
  onClose: () => void;
}

export default function AdminPanel({ currentLanguage, onClose }: AdminPanelProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);

  const t = translations[currentLanguage];

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/appointments");
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (err) {
      console.error("Admin dashboard fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id: string, nextStatus: "confirmed" | "cancelled") => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });
      if (response.ok) {
        const updated = await response.json();
        setAppointments(prev => prev.map(a => a.id === id ? updated : a));
        if (selectedApt?.id === id) {
          setSelectedApt(updated);
        }
      }
    } catch (err) {
      console.error("Failure modifying appointment status:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" />

      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-slate-900/70 backdrop-blur-2xl border border-blue-500/20 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden z-10">
        
        {/* Glowing Top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-indigo-600" />

        {/* Header */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
              <Database className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white font-sans tracking-wide">
                MedClinic Operational Admin Console
              </h3>
              <p className="text-xs text-slate-400">Real-time patient intake and schedules control panel</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={fetchAppointments}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-blue-400" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* List panel */}
          <div className="w-full md:w-3/5 border-r border-white/5 overflow-y-auto p-4 space-y-2.5 scrollbar-thin">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                QUEUE INTAKES ({appointments.length})
              </span>
            </div>

            {appointments.length === 0 ? (
              <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-xl">
                Har bir yangi onlayn qabul shu yerda namoyon bo'ladi.
              </div>
            ) : (
              appointments.map((apt) => (
                <div
                  key={apt.id}
                  onClick={() => setSelectedApt(apt)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between bg-slate-950/40 hover:bg-slate-900/40 relative overflow-hidden group ${
                    selectedApt?.id === apt.id 
                      ? "border-blue-500 shadow-lg shadow-blue-500/5 bg-blue-500/5" 
                      : "border-slate-850 hover:border-slate-800"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white text-xs">{apt.patientName}</h4>
                      <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-md ${
                        apt.status === "confirmed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : apt.status === "cancelled"
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/10"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/10 animate-pulse"
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-sans">
                      {apt.doctorName} · <span className="text-blue-400">{apt.serviceName}</span>
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono tracking-tight">
                      {apt.date} @ {apt.time}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedApt(apt);
                      }}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Details & Actions Panel */}
          <div className="w-full md:w-2/5 p-5 bg-slate-950/30 overflow-y-auto space-y-5">
            {selectedApt ? (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-550 font-mono uppercase tracking-wider block">APPOINTMENT TICKET</span>
                  <h4 className="text-white font-bold text-sm">{selectedApt.patientName}</h4>
                  <p className="text-[10px] font-mono text-slate-500">ID: {selectedApt.id}</p>
                </div>

                <div className="space-y-3 bg-slate-950/80 p-4 border border-white/5 rounded-xl text-xs space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] text-slate-550 font-mono block uppercase">TELEFON</span>
                      <span className="text-slate-200 font-mono">{selectedApt.phone}</span>
                    </div>
                  </div>

                  {selectedApt.email && (
                    <div className="flex items-start gap-2.5 border-t border-white/5 pt-2">
                      <Mail className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] text-slate-550 font-mono block uppercase">EMAIL</span>
                        <span className="text-slate-200">{selectedApt.email}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2.5 border-t border-white/5 pt-2">
                    <Calendar className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] text-slate-550 font-mono block uppercase">SANA (DATE)</span>
                      <span className="text-slate-200 font-mono font-medium">{selectedApt.date}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 border-t border-white/5 pt-2">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] text-slate-550 font-mono block uppercase">SOAT (TIME COORD)</span>
                      <span className="text-cyan-300 font-mono font-medium">{selectedApt.time}</span>
                    </div>
                  </div>

                  {selectedApt.notes && (
                    <div className="flex items-start gap-2.5 border-t border-white/5 pt-2">
                      <FileText className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] text-slate-550 font-mono block uppercase">ESLATMA / SHIKOYAT</span>
                        <p className="text-slate-350 leading-relaxed font-sans">{selectedApt.notes}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions Row */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    disabled={selectedApt.status === "cancelled"}
                    onClick={() => handleUpdateStatus(selectedApt.id, "cancelled")}
                    className="py-2.5 px-3 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-450 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all disabled:opacity-40"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    Bekor Qilish
                  </button>
                  <button
                    disabled={selectedApt.status === "confirmed"}
                    onClick={() => handleUpdateStatus(selectedApt.id, "confirmed")}
                    className="py-2.5 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-450 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all disabled:opacity-40"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Tasdiqlash
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-slate-900 rounded-xl bg-slate-950/20">
                <CheckCircle2 className="w-8 h-8 text-slate-705 mb-2 animate-bounce" />
                <p className="text-xs text-slate-500">
                  Tafsilotlar and holat yangilash panelini ochish uchun o'ng tomondagi ro'yxatdan birorta bemorni tanlang.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

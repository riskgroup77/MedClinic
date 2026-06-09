import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, AlertCircle, Bot, User, CheckCircle2 } from "lucide-react";
import { Language, TranslationPack } from "../types";
import { translations } from "../data";

interface MedicalAgentProps {
  currentLanguage: Language;
  onOpenBooking: () => void;
}

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export default function MedicalAgent({ currentLanguage, onOpenBooking }: MedicalAgentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const threadEndRef = useRef<HTMLDivElement | null>(null);
  const t = translations[currentLanguage];

  // Quick suggestions based on language
  const suggestions: Record<Language, string[]> = {
    uz: [
      "Kardiologlar ro'yxati va malakasi",
      "Klinika narxlari qancha?",
      "Ish vaqtlari va manzil",
      "Qanday qabulga yozilaman?"
    ],
    ru: [
      "Список кардиологов и квалификация",
      "Какие цены на услуги?",
      "График работы и адрес",
      "Как записаться на прием?"
    ],
    en: [
      "Specialist doctors and profiles",
      "Full medical price list",
      "Hours of operation and address",
      "How to book an appointment"
    ]
  };

  useEffect(() => {
    // Append initial greeting from AI on first chat opening
    if (messages.length === 0) {
      setMessages([
        {
          role: "model",
          text: t.aiWelcome
        }
      ]);
    }
  }, [isOpen, currentLanguage]);

  useEffect(() => {
    // Auto-scroll to latest message
    threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: "user", text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg]
        })
      });

      if (!response.ok) {
        throw new Error("API stream broken");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "model", text: data.text }]);
    } catch (err) {
      console.error("AI agent failed:", err);
      // Fallback message
      setMessages(prev => [
        ...prev,
        {
          role: "model",
          text: currentLanguage === "uz" 
            ? "Tizimda kichik uzilish yuz berdi. Iltimos, keyinroq qayta urining yoki to'g'ridan-to'g'ri qabul sahifamizdan foydalaning!"
            : currentLanguage === "ru"
            ? "Произошел технический сбой. Пожалуйста, повторите попытку позже или воспользуйтесь формой записи!"
            : "A minor network latency occurred. Please try again or navigate directly to the scheduling portal!"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Dialog */}
      {isOpen && (
        <div 
          id="chat-floating-module"
          className="w-[90vw] sm:w-[410px] h-[550px] bg-slate-950/85 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300 transform scale-100 origin-bottom-right animate-in fade-in slide-in-from-bottom-5"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-950/80 via-slate-900/80 to-blue-900/40 border-b border-blue-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/40 shadow-inner">
                  <Bot className="w-5 h-5 text-blue-400 animate-pulse" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full animate-bounce"></span>
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm tracking-wide font-sans">{t.aiAssistant}</h4>
                <p className="text-[10px] text-blue-400 font-mono tracking-tight">{t.aiSubtitle}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Warning notice */}
          <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-start gap-2.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-200/85 leading-relaxed font-sans">
              {t.aiWarning}
            </p>
          </div>

          {/* Message Thread container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-500/20">
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              return (
                <div 
                  key={index}
                  className={`flex gap-2.5 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 ${
                    isUser 
                      ? "bg-cyan-600/10 border-cyan-500/20 text-cyan-400" 
                      : "bg-blue-600/10 border-blue-500/20 text-blue-400"
                  }`}>
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed font-sans whitespace-pre-wrap ${
                      isUser 
                        ? "bg-gradient-to-br from-blue-600/90 to-indigo-700/80 text-white rounded-tr-none shadow-lg shadow-blue-500/10 border border-blue-400/20" 
                        : "bg-slate-900 text-slate-200 rounded-tl-none border border-slate-800"
                    }`}>
                      {message.text}
                    </div>
                    {/* Render action booking button directly if mentioned */}
                    {!isUser && message.text.toLowerCase().includes("qabul") && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onOpenBooking();
                        }}
                        className="mt-2 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg hover:bg-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {t.ctaBooking}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto items-center">
                <div className="w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={threadEndRef} />
          </div>

          {/* Quick Suggestions overlay */}
          <div className="px-4 pb-2.5 flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto">
            {suggestions[currentLanguage].map((term, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(term)}
                className="text-[10px] text-slate-300 hover:text-cyan-300 bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 px-2 py-1 rounded-lg cursor-pointer transition-all truncate max-w-full"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Input Panel */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputVal);
            }}
            className="p-3 bg-slate-950 border-t border-slate-900 flex items-center gap-2"
          >
            <input 
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t.aiPlaceholder}
              className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500/60 transition-all rounded-xl px-3 py-2 text-xs text-white outline-none font-sans"
            />
            <button 
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="p-2 rounded-xl bg-blue-650 hover:bg-blue-600 text-white disabled:opacity-40 disabled:hover:bg-blue-650 transition-all flex items-center justify-center shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Launcher Button widget */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white shadow-2xl flex items-center justify-center group relative cursor-pointer active:scale-95 transition-all border border-blue-400/20 hover:shadow-[0_0_25px_rgba(37,99,235,0.45)]"
      >
        <div className="absolute inset-0 rounded-full border border-blue-400/40 animate-ping opacity-25"></div>
        {isOpen ? (
          <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <Sparkles className="absolute -top-2.5 -right-2.5 w-4 h-4 text-cyan-300 animate-pulse" />
          </div>
        )}
      </button>
    </div>
  );
}

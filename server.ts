import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { doctorsData, servicesData } from "./src/data";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// File-based persistence for appointments
const APPOINTMENTS_FILE = path.join(process.cwd(), "appointments.json");

function readAppointments() {
  try {
    if (fs.existsSync(APPOINTMENTS_FILE)) {
      const data = fs.readFileSync(APPOINTMENTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to read appointments file, using fallback:", err);
  }
  
  // High-fidelity fallback initial database for demonstration
  return [
    {
      id: "apt-demo-1",
      patientName: "Asadbek Karimov",
      phone: "+998 90 123 45 67",
      email: "asadbek@example.com",
      doctorId: "doc-ulugbekov",
      doctorName: "Ulug'bekov Elyor Rustamovich",
      serviceId: "cardiology",
      serviceName: "Kardiologiya",
      date: "2026-06-10",
      time: "11:00",
      notes: "Doimiy qon bosimi oshishi burchagi bo'yicha profilaktika.",
      status: "confirmed",
      createdAt: new Date().toISOString()
    },
    {
      id: "apt-demo-2",
      patientName: "Nargiza Alimova",
      phone: "+998 94 987 65 43",
      email: "nargiza.a@example.com",
      doctorId: "doc-karimova",
      doctorName: "Karimova Feruza Baxtiyorovna",
      serviceId: "neurology",
      serviceName: "Nevrologiya",
      date: "2026-06-11",
      time: "14:30",
      notes: "Tungi uyqusizlik va o'ng bel og'rig'i tahlili.",
      status: "pending",
      createdAt: new Date().toISOString()
    }
  ];
}

function writeAppointments(appointments: any[]) {
  try {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist appointments to file:", err);
  }
}

let appointmentsStore = readAppointments();

// Securely instantiate Google Gen AI using recommended SDK guidelines
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
} else {
  console.warn("GEMINI_API_KEY is not defined in environment variables. AI Chat will run in mock mode.");
}

// REST APIs
app.get("/api/doctors", (req, res) => {
  res.json(doctorsData);
});

app.get("/api/services", (req, res) => {
  res.json(servicesData);
});

app.get("/api/appointments", (req, res) => {
  res.json(appointmentsStore);
});

app.post("/api/appointments", (req, res) => {
  const { patientName, phone, email, doctorId, serviceId, date, time, notes } = req.body;
  
  if (!patientName || !phone || !doctorId || !serviceId || !date || !time) {
    res.status(400).json({ error: "Missing required booking details." });
    return;
  }

  const doctor = doctorsData.find(d => d.id === doctorId);
  const service = servicesData.find(s => s.id === serviceId);

  const newAppointment = {
    id: `apt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    patientName,
    phone,
    email: email || "",
    doctorId,
    doctorName: doctor ? doctor.fullName : "Unknown Doctor",
    serviceId,
    serviceName: service ? service.name.uz : "Unknown Service",
    date,
    time,
    notes: notes || "",
    status: "confirmed",
    createdAt: new Date().toISOString()
  };

  appointmentsStore.unshift(newAppointment);
  writeAppointments(appointmentsStore);
  
  res.status(201).json(newAppointment);
});

// Admin command to cancel appointments
app.patch("/api/appointments/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const apt = appointmentsStore.find(a => a.id === id);
  if (apt) {
    apt.status = status || "cancelled";
    writeAppointments(appointmentsStore);
    res.json(apt);
  } else {
    res.status(404).json({ error: "Appointment not found." });
  }
});

// AI chat support endpoint with full context injections (RAG equivalent)
const systemInstruction = `Siz MedClinic innovatsion va futurisitk shaxsiy tibbiy koordinatori va AI konsultantisiz.
Sizga klinika ma'lumotlar bazasi real vaqt rejimida biriktirilgan (RAG). Foydalanuvchi qaysi tilda savol bersa, o'sha tilda (O'zbekcha, Ruscha yoki Inglizcha) javob bering.

Klinikamiz haqida ma'lumot:
1. Nomi: MedClinic (Premium Digital Experience).
2. Manzil: Toshkent shahri, Yunusobod tumani, Amir Temur ko'chasi 77-uy.
3. Ish vaqti: Dushanbadan Jumagacha, soat 09:00 dan 18:00 gacha. Shoshilinch travmatologiya 24/7 ishlaydi.
4. Bizning shiorimiz: "Stop Managing Systems. Start Managing Growth." (Devini.io uslubida tayyorlangan).

Shifokorlarimiz ro'yxati (Roster):
${doctorsData.map(d => `- ${d.fullName}: Mutaxassisligi: ${d.specialty.toUpperCase()}, Tajribasi: ${d.experience} yil, Reytingi: ${d.rating}/5. Bio: ${d.bio.uz}`).join("\n")}

Klinika Xizmatlari va Narxlari:
${servicesData.map(s => `- ${s.name.uz}: Kategoriya: ${s.category}, Narxi: ${s.price} UZS, Davomiyligi: ${s.duration} daqiqa. Tavsif: ${s.description.uz}`).join("\n")}

Sizning vazifangiz:
- Foydalanuvchilarning shifokorlar, narxlar, qabulga yozilish va klinika xizmatlariga doir har qanday savollariga aniq javob berish.
- Foydalanuvchiga shifokor mutaxassisligi bo'yicha to'g'ri maslahat berish, muolaja uchun tayyorgarlik ko'rish yo'riqlarini aytib berish.
- AI maslahati mutaxassis shifokorlarning bevosita ko'rigini almashtira olmasligini muloyimlik bilan eslatish.
- Agar bemor qabulga yozilmoqchi bo'lsa, ularni onlayn bron burchagi tomon yo'naltiring (masalan, interfeysda "Onlayn Qabul" tugmasi borligini ayting).
- Javob va harakatlaringiz silliq, juda professional, zamonaviy va ma'lumotlarga to'la bo'lsin. Hech qachon xayoliy narsalarni qo'shmang (RAG asosida javob bering).`;

app.post("/api/ai-chat", async (req, res) => {
  const { messages } = req.body; // Array representing chat state: [{ role: "user" | "model", text: string }]
  
  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: "Missing active chat history." });
    return;
  }

  const latestMessage = messages[messages.length - 1]?.text;
  if (!latestMessage) {
    res.status(400).json({ error: "Empty prompt in chat stream." });
    return;
  }

  // Check if API client is active
  if (!ai) {
    // Elegant simulation if API Key is not set yet
    let responseText = "Kechirasiz, hozirda sayt server tizimlarimiz va maslahat xizmatimiz sinov rejimida ishlamoqda (API Key kiritilmagan). Biroq klinikamiz barcha xizmatlari faol! Kardiologiya (Elbekov E.R.) yoki Nevrologiyaga (Karimova F.B.) onlayn qabul olishimiz mumkin. Savolingizga tezda yordam berishni istardim!";
    if (latestMessage.toLowerCase().includes("kardiolog") || latestMessage.toLowerCase().includes("yurak")) {
      responseText = "Bizda kardiologiya yo'nalishida Tibbiyot Fanlari Nomzodi Elyor Rustamovich Ulug'bekov xizmat ko'rsatadilar (18 yillik xalqaro tajriba, narxi: 350,000 UZS). Qabulga onlayn jadvalimiz orqali yozilishingiz mumkin!";
    } else if (latestMessage.toLowerCase().includes("narx") || latestMessage.toLowerCase().includes("pul")) {
      responseText = "Klinikamiz premium xizmat narxlari: Kardiolog ko'rigi - 350,000 so'm, Nevrolog qabuli - 300,000 so'm, Ortoped - 280,000 so'm, MRT va Radiologiya - 500,000 so'm, Oftalmolog ko'rigi - 320,000 so'mni tashkil etadi.";
    }
    res.json({ text: responseText });
    return;
  }

  try {
    // Format full messages for `@google/genai` API
    // System instruction is supplied cleanly in the config payload.
    // Convert history format to system format
    const contents = messages.map(msg => ({
      role: msg.role === "user" ? "user" as const : "model" as const,
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3
      }
    });

    res.json({ text: response.text || "Javob hosil qilishda uzilish yuz berdi." });
  } catch (err: any) {
    console.error("Gemini API server call failed:", err);
    res.status(500).json({ error: "System failed to resolve the query. Details: " + err.message });
  }
});

// Configure Vite middleware in development or serve static assets in production
async function setupViteServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Express with Vite Dev Server Middleware...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving pre-compiled production assets...");
    const distPath = path.join(process.cwd(), "dist");
    
    // Explicit static files serving for the built SPA
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MedClinic Full-Stack application powered by Devini running on http://localhost:${PORT}`);
  });
}

setupViteServer().catch(err => {
  console.error("Critical failure during Full-Stack Server Boot:", err);
});

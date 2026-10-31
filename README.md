# 🩺 MedAI – AI-Powered Medical Consultant 🤖

MedAI is an AI agent designed to make **medical consultations** simple, secure, and reliable.  
It connects users with multiple healthcare specialists, generates reports, and even supports **voice-based conversations** for a more natural experience.  

---

## 🌐 Live Demo Link
👉 [aimedi.tech](https://medi-ai-agent.vercel.app/)

---


---

## ✨ Features
- 🔐 **Secure Authentication** (Clerk integration)  
- 👩‍⚕️ **Consult with multiple specialists**:
  - General Physician  
  - Pediatrician  
  - Dermatologist  
  - Psychologist  
  - Nutritionist  
  - Cardiologist  
  - ENT Specialist  
  - Orthopedic (bone, joint, and muscle care)  
  - Gynecologist  
  - Dentist  
- 🧠 **AI-powered specialist recommendation** based on symptoms  
- 🎙️ **Voice-enabled consultations** (powered by Vapi)  
- 📑 **Automatic report generation** after consultation  
- 💳 **Pricing & Billing system** (currently free with test card worth $48)  

---

## 🛠️ Tech Stack
- ⚛️ **Next.js** – Frontend & Backend framework  
- 🔐 **Clerk** – Secure authentication  
- 🤖 **Gemini API** – AI consultations  
- 🎤 **Vapi** – Voice interaction  
- 🗄️ **PostgreSQL** – Database for secure data storage  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/medai.git
cd medai
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Environment Variables
Create a `.env.local` file in the root directory and add:

```
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_key
CLERK_API_KEY=your_clerk_api_key
GEMINI_API_KEY=your_gemini_api_key
VAPI_API_KEY=your_vapi_api_key
DATABASE_URL=your_postgresql_url
```

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Now visit 👉 [http://localhost:3000](http://localhost:3000)


## 🤝 Contributing
Contributions are welcome!  

1. Fork the repo  
2. Create a new branch (`feature-branch`)  
3. Commit your changes  
4. Push and open a Pull Request  

---

## 📜 License
This project is licensed under the **MIT License** – feel free to use and modify.

---

## 💬 Feedback
I’d love to hear your thoughts!  
Drop a ⭐ on the repo or share feedback via issues/DM.

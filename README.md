# 💰 PennyAI – Smart AI-Powered Expense Tracker  

[![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/API-Express.js-black?logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Tailwind](https://img.shields.io/badge/UI-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌐 Live Demo  

🔗 **Website:** [https://pennyai.vercel.app](https://pennyai.vercel.app)  
🧠 **Backend API:** [https://pennyai-api.onrender.com](https://pennyai-api.onrender.com) *(example links — replace after deployment)*

---

## 🧾 Overview  

**PennyAI** helps users manage and predict their expenses with AI.  
Built using the **MERN stack** + **Google Gemini AI**, it provides real-time insights, budget tips, and a sleek, minimalist dashboard.

> 💡 “Track smart. Spend wise. Predict with PennyAI.”

---

## ✨ Features  

- 📅 **Add Expenses Easily** – Categorize, note, and date each expense.  
- 📈 **Dynamic Charts** – Instantly visualize spending patterns by category.  
- 🧠 **AI Predictions** – Forecast next month’s expenses & get 3 smart financial tips.  
- 🔎 **Filter by Date Range** – Analyze expenses across any timeframe.  
- 🧾 **Google Autocomplete** – Smart autofill for expense notes and categories.  
- 🔐 **User-Specific Data** – Secured using JWT and MongoDB.  
- 🧭 **Clean UI** – Navbar-based layout for a modern, distraction-free experience.  

---

## 🖼️ Screenshots  

| Page | Preview |
|------|----------|
| **Landing Page** | ![Landing](./screenshots/landing.png) |
| **Dashboard** | ![Dashboard](./screenshots/dashboard.png) |
| **AI Prediction Modal** | ![AI Modal](./screenshots/ai-predict.png) |
| **Add Expense Form** | ![Add Expense](./screenshots/add-expense.png) |

---

## ⚙️ Tech Stack  

**Frontend**  
- React.js (Vite)  
- Tailwind CSS  
- Axios  
- Recharts  

**Backend**  
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT Authentication  

**Integrations**  
- Google Gemini API (AI Predictions)  
- Google Places API (Autocomplete)  

**Deployment**  
- Frontend → Vercel / Netlify  
- Backend → Render / Railway  
- Database → MongoDB Atlas  

---

## 🗂️ Folder Structure  

```

pennyai/
├── client/                   # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AIInsights.jsx
│   │   │   └── LoginSignup.jsx
│   │   ├── utils/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
├── server/                   # Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── config/
│
└── README.md

````

---

## 🚀 Setup Instructions  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/GEARdHAX/PennyAI.git
cd PennyAI
````

### 2️⃣ Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 3️⃣ Configure environment variables

Create `.env` inside `/server`:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_gemini_key
GOOGLE_API_KEY=your_google_api_key
```

### 4️⃣ Run the app

```bash
# Run backend
cd server && npm start

# Run frontend
cd client && npm run dev
```

---

## 🧠 AI Prediction Workflow

If user has past 1–2 months of data → AI uses it for forecasting.
If not → AI uses user-input budget + expense categories.
Then generates:

1. Next month’s expense estimate 💸
2. 3 actionable saving tips 💡
3. Expense distribution insight 🧾

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

* Google Gemini API
* MongoDB Atlas
* Recharts
* Tailwind CSS

---

⭐ **If you like this project, give it a star!**
🚀 Built with ❤️ by Adarsh Arya(https://github.com/GEARdHAX)

# Healora Healthcare Frontend Application

Modern, responsive Web Application frontend for **Healora Disease Prediction System** built with React 19, Vite, Tailwind CSS v4, Framer Motion, and Lucide React icons.

---

## 🚀 Features

- 🩺 **Interactive Symptom Checker**: Multi-step symptom selector with category filters, search, and dynamic tags.
- 📊 **Health Analytics & Visualizations**: Interactive charts powered by `Recharts` showing risk trends, disease probabilities, and symptom distributions.
- 📄 **Medical PDF Export**: Generate and download professional medical assessment reports as PDF using `jsPDF` and `html2canvas`.
- 🔐 **Authentication Flow**: Login, Registration, JWT session management via HTTP-only cookie persistence.
- 👤 **Patient Dashboard & Profile**: View personal health history logs, manage profile details (age, gender, blood group), and search past predictions.
- 🎨 **Modern Aesthetics**: Sleek dark/light-compatible design system built with Tailwind CSS v4, Glassmorphism, and Framer Motion micro-animations.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (ES Modules)
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4
- **State & Router**: React Router v7, React Hook Form
- **Data Visualization**: Recharts
- **Icons & Motion**: Lucide React, Framer Motion
- **Document Export**: jsPDF, html2canvas
- **HTTP Client**: Axios

---

## ⚙️ Setup & Running

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run Vite dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will run by default at: `http://localhost:5173`

---

## 🌐 Environment Variables

Create `.env` file in `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

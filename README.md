# 🏦 Vitto Lending - AI-Powered MSME Loan Decision Platform

![Vitto Lending Banner](https://img.shields.io/badge/Vitto-Lending-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📌 Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | [https://vitto-assesment.vercel.app](https://vitto-assesment.vercel.app) |
| **Backend API** | [https://assesment-b2ib.onrender.com](https://assesment-b2ib.onrender.com) |
| **Github Repo** | [https://github.com/RajAryan1001/Vitto_Assesment](https://github.com/RajAryan1001/Vitto_Assesment) |
| **Health Check** | [https://assesment-b2ib.onrender.com/health](https://assesment-b2ib.onrender.com/health) |

---

## 🎯 Project Overview

**Vitto Lending** is a complete **Full-Stack MSME Loan Decision Platform** that uses an intelligent scoring algorithm to automatically approve or reject business loan applications. The system analyzes multiple risk factors including revenue, loan amount, tenure, and business type to make instant decisions.

### Why This Project Stands Out?

✅ **Complete CRUD Operations** - Full Create, Read, Update, Delete functionality  
✅ **AI-Powered Decision Engine** - 700-point scoring system with 15+ risk parameters  
✅ **Professional Dashboard** - Real-time analytics with interactive charts  
✅ **Production Ready** - Deployed on Render (Backend) & Vercel (Frontend)  
✅ **Beautiful UI/UX** - Framer Motion animations, responsive design  
✅ **Data Visualization** - Recharts for insightful analytics  

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React.js** | UI Library | 18.2.0 |
| **Vite** | Build Tool | 5.0.0 |
| **Tailwind CSS** | Styling | 3.3.5 |
| **Framer Motion** | Animations | 10.16.0 |
| **Recharts** | Charts & Graphs | 2.10.0 |
| **React Router DOM** | Routing | 6.20.0 |
| **Axios** | API Calls | 1.6.0 |
| **Lucide React** | Icons | 0.292.0 |
| **React Hot Toast** | Notifications | 2.4.1 |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime | 18.x |
| **Express.js** | Web Framework | 4.18.2 |
| **MongoDB** | Database | Atlas (Cloud) |
| **Mongoose** | ODM | 7.5.0 |
| **Zod** | Validation | 3.22.0 |
| **Express Rate Limit** | Security | 6.7.0 |
| **Helmet** | Security Headers | 7.0.0 |
| **CORS** | Cross-Origin | 2.8.5 |
| **Morgan** | Logging | 1.10.0 |
| **dotenv** | Environment Variables | 16.3.0 |

---

## 📊 How Decision Engine Works (700-Point System)

### The Core Algorithm

Every application starts with **700 base points**. Points are deducted based on risk factors:


🏗️ Backend Architecture
text
┌─────────────────────────────────────────────────────────────┐
│                    Client (Frontend)                         │
│              https://vitto-assesment.vercel.app              │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP Requests
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    Express.js Server                         │
│                  https://assesment-b2ib.onrender.com         │
├─────────────────────────────────────────────────────────────┤
│  Middleware:                                                 │
│  • Helmet (Security Headers)                                │
│  • CORS (Cross-Origin Resource Sharing)                     │
│  • Morgan (Logging)                                          │
│  • Express.json (Body Parser)                               │
│  • Rate Limiter (50 requests/15 min)                        │
├─────────────────────────────────────────────────────────────┤
│  Routes:                                                     │
│  • POST   /api/decision    → Submit application             │
│  • GET    /api/applications → Get all applications          │
│  • GET    /api/applications/:id → Get single application    │
│  • PUT    /api/applications/:id → Update application        │
│  • DELETE /api/applications/:id → Delete application        │
├─────────────────────────────────────────────────────────────┤
│  Controllers:                                                │
│  • submitApplication()                                       │
│  • getAllApplications()                                      │
│  • getApplicationById()                                      │
│  • updateApplication()                                       │
│  • deleteApplication()                                       │
├─────────────────────────────────────────────────────────────┤
│  Services:                                                   │
│  • calculateDecision() → 700-point scoring algorithm        │
├─────────────────────────────────────────────────────────────┤
│  Database:                                                   │
│  • MongoDB Atlas (Cloud)                                     │
│  • Collection: applications                                  │
└─────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                    Browser (User)                            │
│         https://vitto-assesment.vercel.app                   │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                      React App (Vite)                        │
├─────────────────────────────────────────────────────────────┤
│  Routing (React Router DOM):                                 │
│  • /          → Home Page                                    │
│  • /dashboard → Analytics Dashboard                          │
│  • /apply     → Loan Application Form                        │
│  • /history   → Application History                          │
├─────────────────────────────────────────────────────────────┤
│  Components:                                                 │
│  • Navbar (Navigation + Mobile Menu)                         │
│  • LoanForm (Multi-step Form)                                │
│  • DecisionResult (Result Display + Charts)                  │
│  • EditModal (Edit Popup)                                    │
├─────────────────────────────────────────────────────────────┤
│  Context (Global State):                                     │
│  • LendingContext (formData, applications, loading, error)   │
├─────────────────────────────────────────────────────────────┤
│  Services:                                                   │
│  • API calls to backend (Axios)                              │
│  • Interceptors for logging                                  │
├─────────────────────────────────────────────────────────────┤
│  Styling:                                                    │
│  • Tailwind CSS                                              │
│  • Framer Motion (Animations)                                │
│  • Recharts (Charts)                                         │
│  • Lucide React (Icons)                                      │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ API Calls
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    Backend API                               │
│            https://assesment-b2ib.onrender.com               │
└─────────────────────────────────────────────────────────────┘
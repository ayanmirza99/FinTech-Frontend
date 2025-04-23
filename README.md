# 💻 FinConnect – Frontend

A responsive dashboard built with React for the **Subscription-Gated Fintech API Portal**.  
Users can register, log in, subscribe to a plan, and access mock financial APIs through a clean interface.

---

## 🚀 Tech Stack

- React
- Axios
- React Router
- Tailwind CSS
- JWT Authentication
- Shadcn

---

## 🛠️ Setup Instructions (Frontend Only)

### 1. Clone the Repository

```bash
git clone https://github.com/ayanmirza99/FinTech-Frontend.git
cd finconnect-frontend
```

### 2. Install Dependencies

```bash
npm install --force
```

### 3. Create `.env` File

In the root of your project, create a `.env` file and add your backend URL:

```env
VITE_API_BASE_URL=http://localhost:5000
```

> 🔁 Replace the URL with your actual backend server address if hosted online or on a different port.

---

### 4. Start the Development Server

```bash
npm run dev
```

Frontend will run on:  
**http://localhost:5173** (default Vite port)

---

## 📁 Folder Structure Overview

```
src/
├── api/                 # Axios instances & API wrapper logic
├── assets/              # Static images or SVGs
├── components/          # Reusable UI components and forms
├── config/              # Configurations (e.g., axios config)
├── context/             # Auth & subscription context providers
├── hooks/               # Custom React hooks
├── layouts/             # Page layouts (e.g., AuthLayout, DashboardLayout)
├── pages/               # All route-specific pages
│   ├── AdminDashboard/  # Protected routes for admin
│   ├── DevDashboard/    # Protected routes for users
├── routes/              # Public & protected route definitions
├── styles/              # Global styles (Tailwind config)
├── utils/               # Helper functions (e.g., JWT handling)
├── App.jsx              # Main app component
├── main.jsx             # Entry point
```

---

## 🔐 Available Routes

| Route              | Description                   |
|--------------------|-------------------------------|
| `/register`        | Register a new developer      |
| `/login`           | Login to your account         |
| `/pricing`         | Select a subscription plan    |
| `/dashboard/*`     | Protected APIs and dashboard  |

---

## 🧪 Test Users

Use these accounts to test different features of the application:

### 👨‍💻 Developer Accounts (for testing API usage)

1. **Email:** ayan@gmail.com  
   **Password:** admin123/?
   **TransactionID:** 68075921b187d88a69facefe
   

3. **Email:** messi@gmail.com  
   **Password:** ye123456
   **TransactionID:** 68086bc8ed0629a551804d5c

These developer users can:
- Register and log in
- Subscribe to a plan
- Access APIs like balance check, transfer, transactions, and invoice

---

### 🛡️ Admin Account (for Testing Admin Features)

1. **Email:** ayanjawed.m@gmail.com  
   **Password:** admin123456/?  

The admin user can:  
- View all users and their subscription statuses  
- Cancel subscriptions for any user  
- View API request logs  
- (Optionally) Create mock users via a dedicated admin-only endpoint  

---

## 🧠 Notes

- Ensure your **backend server is running** and matches the URL in `.env`.
- You must **log in and subscribe** before accessing any `/dashboard/*` routes.
- This project is part of the **WebKode Challenge 2025**.

---

# 🧪 RandomStuff

A Node.js backend project initialized on **05-06-2025**

---

## 📁 Project Setup

### ✅ Initialized & Configured:

- Node.js project initialized
- Project structure created
- Express app setup in `app.js`

---

## 📦 Installed Dependencies

| Package         | Purpose                                   |
| --------------- | ----------------------------------------- |
| `express`       | Web framework for building APIs           |
| `mongoose`      | MongoDB ODM for data modeling             |
| `bcrypt`        | Password hashing                          |
| `jsonwebtoken`  | Token-based authentication (JWT)          |
| `dotenv`        | Environment variable management           |
| `cors`          | Enable CORS support                       |
| `cookie-parser` | Parse cookies attached to client requests |

---

## 🗂️ Project Structure

```bash
RandomStuff/
│
├── app.js                 # Entry point of the app
├── /models                # Mongoose models
├── /routes                # Route handlers
├── /controllers           # Request logic
├── /middlewares           # Custom middleware
├── /services              # Business logic & reusable services
├── /config                # Configuration files (e.g., DB connection)
├── .env                   # Environment variables
├── package.json           # Project metadata & dependencies
└── README.md              # Project documentation

```

### 05-06-25 (Meghana)

- Created `authmodel`, `authcontroller`, `authroutes`.
- Created `adminmodel`, `admincontroller`, `adminroutes`.

### 05-06-2025 (Onkar)

- Created middleware for both auth and admin routes.
- Integrated OAuth login with Google and GitHub.
- Installed new dependencies:
  - `passport`
  - `passport-google-oauth20`
  - `passport-github2`

### 🗓️ **06-06-25**

#### ✅ Meghana

- Created `profilemodel`, `profilecontroller`, and `profileroutes` for managing user profiles.

#### ✅ Onkar

- **Utils:**

  - Implemented `generateOtp` function for OTP generation.
  - Created `mailer` utility for sending OTPs and welcome emails.

- **Auth Features:**

  - Developed **request OTP** and **verify OTP** endpoints for email verification.
  - Integrated email service to send **OTP** during registration and **welcome emails** upon successful signup.

  ## Meghana

  - Handled reset and password

### 🗓️ **07-06-25**

#### ✅ Meghana

- Integrated **password reset** functionality.

#### ✅ Onkar

- Handled **Captcha** verification in server side for user registration.

### 🗓️ **08-06-2025**

✅ Initialized the **frontend** and integrated **Tailwind CSS** and **shadcn/ui** for building modern UIs.

- Created login register landingpage design

---

## 📦 Installed Frontend Dependencies

| Package            | Purpose                                   |
| ------------------ | ----------------------------------------- |
| `axios`            | HTTP client for making API requests       |
| `react-redux`      | State management with Redux in React      |
| `@reduxjs/toolkit` | Simplified Redux logic and best practices |
| `react-toastify`   | Displaying toast notifications and alerts |
| `react-router-dom` | Client-side routing for React apps        |

---

- Created `login`, `register`, `Navbar`,`Dock`,`SettingPage` and `LandingPage` components.
- Handled **captcha** verification in server side for user registration.
- Integrated **password reset** functionality.

### 🗓️ **09-06-2025**

- Created `AdminLogin` and `AdminDashboard` components.
- Created `Profile Creation Page` and `Otp Verification Page` components.
- Integrated **Redux** for state management.

### 🗓️ **09-06-2025**

- Redesigned All component.

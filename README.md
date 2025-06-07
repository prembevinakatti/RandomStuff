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

| Package         | Purpose                                     |
|-----------------|---------------------------------------------|
| `express`       | Web framework for building APIs             |
| `mongoose`      | MongoDB ODM for data modeling               |
| `bcrypt`        | Password hashing                            |
| `jsonwebtoken`  | Token-based authentication (JWT)            |
| `dotenv`        | Environment variable management             |
| `cors`          | Enable CORS support                         |
| `cookie-parser` | Parse cookies attached to client requests   |

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

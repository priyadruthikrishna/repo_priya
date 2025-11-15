 🏥 Emergency Patient Health Record Access System (EMR Project)

 📘 Overview
The **Emergency Patient Health Record Access System** is designed to enable **doctors**, **hospitals**, and **emergency responders** to access patient health information securely and instantly using a **QR code**.  
Each patient is assigned a unique QR code linked to their encrypted health record.

This system ensures **quick**, **secure**, and **role-based** access to critical medical data — even during emergencies.

---

## 👨‍💻 Team Members

| Name | Role |
|------|------|
| **Naveen Kumar B** | Team Lead , Database & API Management |
| **Yashwin Gowda K** |  Backend Developer / Encryption & QR Logic |
| **Priya K** | Frontend Developer / React UI Integration |
| **Shalini M G** | Documentation & Testing |

---

## ⚙️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js (React Scripts) |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (Local / Atlas) |
| **Auth** | JWT (JSON Web Token) |
| **Encryption** | AES-256-CBC |
| **QR Code** | `qrcode` + `html5-qrcode` |
| **Styling** | CSS |

---

 🧩 Features
- 👨‍⚕️ Doctor login & role-based access
- 🧾 Patient registration with AES-encrypted medical data
- 🚑 QR code generation for every patient
- 🔓 Emergency mode (public view — limited info)
- 🔐 JWT-secured routes for doctors
- 📱 React UI with built-in QR scanner

---

 🏗️ Folder Structure

emr-project/ │ ├── server/                # Backend (Node + Express) │   ├── models/            # MongoDB Schemas │   ├── routes/            # API Endpoints │   ├── middleware/        # JWT and Role validation │   ├── utils/             # Encryption utilities (AES) │   └── server.js          # Main backend entry │ ├── client/                # Frontend (React) │   ├── src/ │   │   ├── components/    # UI Components (Forms, QR Scanner) │   │   └── App.js         # Main app │   └── package.json │ ├── .env                   # Environment configuration ├── package.json           # Root npm scripts └── README.md              # Documentation

---

 ⚙️ Setup Instructions (After Cloning)

 1️⃣ Clone the Repository
bash
git clone <repository-url>
cd emr-project


---

2️⃣ Install Node Modules

 for first-time setup:

Method 1: Install everything at once (root)

npm run install-all --legacy-peer-deps

Method 2: Install manually (recommended if root script fails)

cd server
npm install
cd ../client
npm install --legacy-peer-deps
cd ..

✅ This wilL install all dependencies for both backend and frontend.


---

3️⃣ Create a .env File (In Project Root)

PORT=5000
MONGO_URI=mongodb://localhost:27017/emr_db
JWT_SECRET=my_super_secret_key
AES_SECRET=32_byte_secret_key_1234567890abcd
BASE_URL=http://localhost:5000


---

4️⃣ Setup MongoDB

🪟 Option 1: Local MongoDB (Recommended for offline)

1. Download MongoDB Community Server


2. Install it using default options
✅ Check “Install MongoDB as a Service” during setup.


3. Start the MongoDB service:

net start MongoDB


4. Confirm it’s running:

mongo --version



☁️ Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas


2. Create a free cluster


3. Copy your connection string and update .env:

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/emr_db




---

5️⃣ Run the Application

Development Mode (both backend + frontend)

npm run dev

Backend → http://localhost:5000

Frontend → http://localhost:3000


✅ You should see:

MongoDB connected
Server running on 5000


---

🩺 Usage Guide

Doctor Registration

POST /api/auth/register

{
  "name": "Dr. Naveen",
  "email": "doctor@hospital.com",
  "password": "securepass",
  "role": "doctor"
}

Doctor Login

POST /api/auth/login

Returns a JWT token.

Register Patient

POST /api/patients/register

Stores encrypted data + generates a QR code.

Emergency Access (no auth)

GET /api/emergency/:qrToken

Returns only safe emergency info.

Full Patient Access (JWT required)

GET /api/patients/:id/full
Authorization: Bearer <token>


---

🧠 How It Works

1️⃣ Doctor registers a patient → backend encrypts data (AES) → returns QR code
2️⃣ QR printed / saved on patient card
3️⃣ Paramedics scan QR using emergency page → get only emergency data
4️⃣ Doctors login → decrypt and view full data


---

📋 Sample Postman Collection

Action	Method	Endpoint

Register Doctor	POST	/api/auth/register
Login Doctor	POST	/api/auth/login
Register Patient	POST	/api/patients/register
Get Full Patient	GET	/api/patients/:id/full
Emergency Access	GET	/api/emergency/:qrToken



---

🔐 Security Highlights

AES-256-CBC encryption for patient records

JWT tokens for doctor authentication

Role-based route protection

Limited fields accessible in emergency mode



---

💡 Future Enhancements

Admin dashboard for hospital data management

Biometric doctor login (fingerprint/face recognition)

SMS notification for patient updates

Cloud-based backup system



---

🧾 Author & Contributors

Name	Role	Responsibility

Naveen Kumar B	Team Lead /   Database	MongoDB, Schema Design, Data Flow
Priya K	Frontend	React UI, Patient Registration, Styling
Yashwin Gowda K	Backend	Node.js ,Express,Encryption, QR Logic
Shalini M G	QA & Docs	Testing, Documentation, Presentation



---

⚡ Quick Start Summary

# Clone project
git clone <repo-url>
cd emr-project

# Install all dependencies
npm run install-all --legacy-peer-deps

# Start MongoDB
net start MongoDB   # or use Atlas URI in .env

# Run the app
npm run dev

✅ Opens React app at http://localhost:3000
✅ Backend API available at http://localhost:5000


---

📜 License

GPL-3.0 License © 2025
Team ByteBrigade — Naveen Kumar B,Yashwin Gowda K, Priya K, Shalini M G

---


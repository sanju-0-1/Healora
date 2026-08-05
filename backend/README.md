# MediSense Healthcare Backend API

Production-ready, modular MVC REST API for **MediSense / Healora Disease Prediction Web Application** built with Node.js, Express.js, MongoDB, Mongoose, and JWT authentication.

---

## 🚀 Features

- **MVC Architecture**: Separates models, views/routes, controllers, and services.
- **Authentication**: JWT authentication with HTTP-only cookies and bcrypt password hashing.
- **Security**: Hardened with Helmet security headers, Express Rate Limiter, CORS policies, and input validation via `express-validator`.
- **Similarity Prediction Engine**: `PredictionService` matching symptom vectors against MongoDB disease database to compute confidence percentages and doctor recommendations.
- **Data Querying**: Pagination, text search, severity filtering, doctor type filtering, and sorting for diseases and history logs.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB via Mongoose ORM
- **Security**: JWT, bcryptjs, Helmet, Rate Limiter, CORS
- **Validation**: express-validator

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root of `backend/`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/medisense
JWT_SECRET=super_secret_jwt_key_medisense_2026
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

---

## 📦 Installation & Running

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Run dev server with nodemon
npm run dev

# Run production server
npm start
```

---

## 📚 API Endpoints Documentation

### Standard Response Format
All successful responses return:
```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

All error responses return:
```json
{
  "success": false,
  "message": "...",
  "errors": []
}
```

---

### 🔑 Authentication Module (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Log in user & receive JWT cookie |
| `POST` | `/api/auth/logout` | Public | Clear JWT authentication cookie |
| `GET` | `/api/auth/me` | Protected | Get authenticated user profile |

---

### 👤 User Module (`/api/users`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/profile` | Protected | Fetch current user profile |
| `PUT` | `/api/users/profile` | Protected | Update profile (name, email, age, gender) |
| `PUT` | `/api/users/change-password` | Protected | Change account password |

---

### 🦠 Disease Module (`/api/diseases`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/diseases` | Public | Fetch diseases with search, severity filter, & pagination |
| `GET` | `/api/diseases/:id` | Public | Fetch disease details by ID |
| `POST` | `/api/diseases` | Protected | Create new disease entry |
| `PUT` | `/api/diseases/:id` | Protected | Update disease record |
| `DELETE` | `/api/diseases/:id` | Protected | Delete disease record |

---

### 🔮 Prediction Module (`/api/predictions`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/predictions` | Protected | Analyze symptoms & compute predicted disease |
| `GET` | `/api/predictions/history` | Protected | Get paginated user prediction history |
| `GET` | `/api/predictions/:id` | Protected | Get single prediction record by ID |
| `DELETE` | `/api/predictions/:id` | Protected | Delete prediction history record |

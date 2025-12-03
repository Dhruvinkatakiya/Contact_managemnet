# Contact Management System

A modern, full-stack contact management application built with React, Redux, Node.js, and Express. Features a professional teal-themed UI with complete CRUD operations, authentication, and real-time search functionality.

## 🚀 Features

- **User Authentication**: Secure login and signup with JWT tokens
- **Contact Management**: Create, read, update, and delete contacts
- **Real-time Search**: Instant contact filtering as you type
- **Status Tracking**: Mark contacts as Active or Inactive
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with teal color theme
- **Form Validation**: Client-side and server-side validation
- **Error Handling**: User-friendly error messages and feedback

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0**: Modern UI library
- **Redux Toolkit 2.0.1**: State management
- **React Router DOM 6.20.0**: Client-side routing
- **Axios 1.6.2**: HTTP client
- **Vite 5.0.8**: Fast build tool and dev server

### Backend
- **Node.js**: JavaScript runtime
- **Express 4.18.2**: Web application framework
- **JWT 9.0.2**: Authentication tokens
- **bcryptjs 2.4.3**: Password hashing
- **express-validator 7.0.1**: Request validation
- **CORS 2.8.5**: Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/Dhruvinkatakiya/Contact_managemnet.git
cd Contact_managemnet
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## 🚦 Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Backend will run on: `http://localhost:5001`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on: `http://localhost:5173` (or next available port)

## 🔐 Default Login Credentials

```
Email: admin@example.com
Password: admin123
```

## 📁 Project Structure

```
Contact_managemnet/
├── backend/
│   ├── data/
│   │   └── store.js           # In-memory data storage
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   └── contacts.js         # Contact CRUD routes
│   ├── package.json
│   └── server.js               # Express server setup
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js        # API configuration
│   │   ├── components/
│   │   │   ├── ContactModal.jsx
│   │   │   ├── DeleteConfirmModal.jsx
│   │   │   ├── LogoutConfirmModal.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   └── contactSlice.js
│   │   │   └── store.js
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Modal.css
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Contacts (Protected Routes)
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts?search=term` - Search contacts
- `GET /api/contacts/:id` - Get single contact
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

## 🎨 Color Theme

The application uses a professional teal color palette:
- **Primary**: #006666
- **Primary Hover**: #004d4d
- **Primary Light**: #e6f2f2
- **Secondary**: #66b2b2

## 📝 Contact Fields

- First Name (required)
- Last Name (required)
- Contact Number (required, minimum 10 digits)
- Email (optional, validated format)
- Status (Active/Inactive)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- HTTP-only token storage
- Client-side route protection
- Request validation

## 🚀 Deployment

See [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) for complete deployment instructions.

**Quick Deploy to Vercel (All-in-One):**

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variable: `JWT_SECRET=your-secret-key`
4. Deploy!

Your app will be live with both frontend and backend on the same domain:
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-app.vercel.app/api`

## ⚠️ Important Notes

- **Data Storage**: Currently uses in-memory storage. Data will be lost when server restarts.
- **Production**: For production use, integrate a database (MongoDB, PostgreSQL, etc.)
- **Environment Variables**: Consider using .env files for sensitive configuration
- **Deployment**: Frontend and backend need separate deployments (see VERCEL_DEPLOY.md)

## 🐛 Troubleshooting

### Backend not connecting
- Ensure backend is running on port 5001
- Check if port is already in use: `lsof -ti:5001`

### Frontend not loading
- Clear browser cache and localStorage
- Check console for errors
- Verify backend API URL in `frontend/src/api/axios.js`

### Authentication issues
- Clear localStorage and try logging in again
- Verify JWT token is being sent with requests
- Check backend console for authentication errors

## 👨‍💻 Developer

**Dhruvin Katakiya**
- GitHub: [@Dhruvinkatakiya](https://github.com/Dhruvinkatakiya)

## 📄 License

This project is open source and available for personal and educational use.

---

**Made with ❤️ for interview demonstration**

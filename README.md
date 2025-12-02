# Contact Management System

A full-stack contact management application built with React, Redux, Node.js, and Express.

## 🚀 Features

### Authentication
- **User Signup**: Create new account with email and password
- **User Login**: Secure JWT-based authentication
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Session Persistence**: User stays logged in across browser sessions

### Contact Management
- **Add Contacts**: Create new contacts with first name, last name, phone number, and optional email
- **Edit Contacts**: Update existing contact information
- **Delete Contacts**: Remove contacts with confirmation dialog
- **Search Functionality**: Real-time search across all contact fields
- **Responsive UI**: Beautiful, modern interface that works on all devices

### Technical Features
- **Form Validation**: Client-side and server-side validation
- **Error Handling**: Comprehensive error messages and feedback
- **Loading States**: User-friendly loading indicators
- **Success Messages**: Confirmation for all CRUD operations
- **Redux State Management**: Centralized state with Redux Toolkit
- **RESTful API**: Well-structured backend API

## 📁 Project Structure

```
Contact_managemnet/
├── backend/
│   ├── data/
│   │   └── store.js          # In-memory data store
│   ├── middleware/
│   │   └── auth.js           # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   └── contacts.js       # Contact CRUD routes
│   ├── package.json
│   └── server.js             # Express server setup
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js      # Axios configuration
    │   ├── components/
    │   │   ├── ContactModal.jsx
    │   │   ├── DeleteConfirmModal.jsx
    │   │   ├── LogoutConfirmModal.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── redux/
    │   │   ├── slices/
    │   │   │   ├── authSlice.js
    │   │   │   └── contactSlice.js
    │   │   └── store.js
    │   ├── styles/
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   ├── Modal.css
    │   │   └── index.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🛠️ Technologies Used

### Frontend
- **React 18**: UI library
- **Redux Toolkit**: State management
- **React Router DOM**: Routing
- **Axios**: HTTP client
- **Vite**: Build tool and dev server

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **JSON Web Tokens (JWT)**: Authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation
- **CORS**: Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   cd Contact_managemnet
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
The backend server will run on `http://localhost:5001`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Contacts (Protected)
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts?search=term` - Search contacts
- `GET /api/contacts/:id` - Get single contact
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

## 🔐 Authentication Flow

1. User signs up or logs in
2. Server generates JWT token
3. Token stored in localStorage
4. Token sent with all API requests via Authorization header
5. Backend validates token for protected routes

## 💾 Data Storage

Currently using **in-memory storage** for simplicity. Data will be lost when server restarts. For production, integrate with a database like:
- MongoDB
- PostgreSQL
- MySQL

## 🎨 UI Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Gradient Backgrounds**: Eye-catching authentication pages
- **Smooth Animations**: Transitions and loading states
- **Icon Integration**: SVG icons for better UX
- **Form Validation**: Real-time feedback on user input
- **Modal Dialogs**: For add/edit/delete operations

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- XSS protection

## 🎯 React Fundamentals Used

- **Functional Components**: Modern React with hooks
- **useState**: Local component state
- **useEffect**: Side effects and lifecycle
- **useDispatch & useSelector**: Redux hooks
- **React Router**: Navigation and protected routes
- **Controlled Components**: Form handling
- **Event Handling**: User interactions
- **Conditional Rendering**: Dynamic UI
- **Component Composition**: Reusable components

## 🎓 Learning Highlights

This project demonstrates:
- Full-stack JavaScript development
- RESTful API design
- State management with Redux
- Form validation
- Authentication & authorization
- Responsive design
- Modern React patterns
- Error handling
- User experience design

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as an internship assignment demonstrating full-stack development skills.

---

**Note**: This is a demonstration project. For production use, implement:
- Persistent database
- Environment variables
- Rate limiting
- Enhanced security measures
- Unit and integration tests
- CI/CD pipeline

## 🚀 Quick Start Guide

### Step 1: Start Backend Server
Open a terminal and run:
```bash
cd backend
npm start
```
✅ Backend running on: http://localhost:5001

### Step 2: Start Frontend Server
Open another terminal and run:
```bash
cd frontend
npm run dev
```
✅ Frontend running on: http://localhost:5173 (or 5174/5175 if port is busy)

### Step 3: Access the Application
Open your browser and visit: **http://localhost:5173** (or the port shown in terminal)

### Step 4: Create an Account
1. Click "Sign Up" 
2. Enter your email and password (min. 6 characters)
3. Click "Sign Up" button

### Step 5: Start Managing Contacts
Once logged in, you can:
- ➕ **Add contacts** - Click "Add New Contact" button
- 🔍 **Search contacts** - Type in the search box
- ✏️ **Edit contacts** - Click the edit icon on any contact
- 🗑️ **Delete contacts** - Click the delete icon

---

## 🎯 Demo Account (Optional)
You can create any account with:
- **Email**: any valid email format
- **Password**: minimum 6 characters

---

## 🛠️ Troubleshooting

### Backend won't start?
- Check if port 5001 is already in use
- Run: `lsof -ti:5001 | xargs kill -9` to free the port

### Frontend won't start?
- Check if ports 5173-5175 are available
- Vite will automatically find the next available port

### CORS errors?
- Make sure both servers are running
- Check that backend CORS allows the frontend port

---

## 📝 Test the Features

### 1. Authentication
- [x] Sign up with new account
- [x] Login with existing account
- [x] Stay logged in after refresh
- [x] Logout functionality

### 2. Contact Management
- [x] Add new contact
- [x] Edit existing contact
- [x] Delete contact
- [x] Search contacts
- [x] View contact list

### 3. Validation
- [x] Email format validation
- [x] Password length check
- [x] Required field validation
- [x] Phone number format

---

## 💡 Tips
- Use realistic names for better demo
- Add multiple contacts to test search
- Test on mobile by opening on your phone
- Check Network tab in DevTools to see API calls

---

## 🎓 Project Highlights for Interview

**Backend Skills:**
- RESTful API design
- JWT authentication
- Express middleware
- Input validation
- Error handling

**Frontend Skills:**
- React hooks (useState, useEffect)
- Redux state management
- Form handling & validation
- Protected routes
- Responsive design

**Full Stack Integration:**
- API integration
- Authentication flow
- CRUD operations
- Real-time search
- Modern UI/UX

Good luck with your interview! 🚀

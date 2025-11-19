# Todo List Application - Full Stack Project

A complete full-stack todo list application built with React and Node.js, both written entirely in TypeScript. The application features user authentication with JWT tokens, comprehensive error logging, and a responsive user interface.

## Project Overview

This project demonstrates a production-ready full-stack application with proper separation of concerns, type safety through TypeScript, and industry-standard practices for both frontend and backend development.

### Key Technologies

**Backend:**
- Node.js with Express.js
- TypeScript for type safety
- MongoDB with Mongoose for data persistence
- JWT for authentication
- bcryptjs for password hashing

**Frontend:**
- React with TypeScript
- React Router for client-side routing
- Zustand for global state management
- React Query for server state and data fetching
- React Hook Form with Zod for form validation
- Axios for API communication

## Features Implemented

### Authentication System
- User signup with email validation
- User login with JWT token generation
- Forgot password functionality with secure token generation
- Password reset with 30-minute token expiration
- Protected routes requiring authentication

### Todo Management
- Create new todos with title and optional description
- View all user's todos in reverse chronological order
- Update todo title, description, and completion status
- Mark todos as completed or incomplete
- Delete todos with confirmation
- Automatic data refresh after mutations

### Error Handling & Logging
- Comprehensive try-catch error handling on all endpoints
- All errors logged to MongoDB ErrorLog collection
- Error logs include timestamp, user ID, endpoint, HTTP method, and stack trace
- Frontend error feedback to users through alerts

### User Data Privacy
- Users can only access their own todos
- Database queries include userId checks for security
- Passwords hashed with bcrypt before storage
- JWT tokens expire after 7 days

## Project Structure

```
project/
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Todo.ts
│   │   │   └── ErrorLog.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── todo.routes.ts
│   │   ├── server.ts
│   │   └── tsconfig.json
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   ├── TodoForm.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   └── index.ts
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   └── TodosPage.tsx
│   │   ├── hooks/
│   │   │   └── useApi.ts
│   │   ├── store/
│   │   │   └── authStore.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)
- Git

### Backend Setup

1. **Clone or navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in backend root:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
   JWT_SECRET=your-secret-key-here-change-in-production
   PORT=5000
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **Get MongoDB Connection String:**
   - Go to https://cloud.mongodb.com
   - Create a free cluster
   - Click "Connect" and copy the connection string
   - Replace `username:password` with your MongoDB credentials
   - Add `/todoapp` at the end for database name

5. **Whitelist Your IP:**
   - In MongoDB Atlas, go to Security > Network Access
   - Click "Add IP Address"
   - Choose "Add Current IP Address" or allow anywhere for development
   - Wait 1-2 minutes for changes to apply

6. **Run backend in development mode:**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   ✓ MongoDB connected
   ✓ Server running on port 5000
   ```

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in frontend root:**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start development server:**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Production Build

**Backend:**
```bash
npm run build
npm start
```

**Frontend:**
```bash
npm run build
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Todo Routes (All require JWT authentication)
- `POST /api/todos` - Create new todo
- `GET /api/todos` - Get all user's todos
- `PATCH /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Usage Flow

1. **First Time User:**
   - Click "Sign up"
   - Enter name, email, and password
   - Account created and automatically logged in
   - Redirected to todos page

2. **Existing User:**
   - Click "Login"
   - Enter email and password
   - Redirected to todos page with previous todos

3. **Managing Todos:**
   - Enter title and optional description
   - Click "Add Todo"
   - Check checkbox to mark complete/incomplete
   - Click "Edit" to modify title and description
   - Click "Delete" to remove todo
   - Click "Logout" to exit

## Database Design

### User Collection
- `email` - Unique, lowercase
- `password` - Hashed with bcrypt
- `name` - User's full name
- `resetToken` - For password recovery
- `resetTokenExpiry` - Token expiration time
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

### Todo Collection
- `userId` - Reference to user
- `title` - Todo title
- `description` - Optional description
- `completed` - Boolean status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### ErrorLog Collection
- `message` - Error message
- `stack` - Error stack trace
- `statusCode` - HTTP status code
- `userId` - User who encountered error (if applicable)
- `endpoint` - API endpoint called
- `method` - HTTP method
- `timestamp` - When error occurred

## Testing with Postman

1. Download Postman from https://www.postman.com/downloads/
2. Use the API endpoints documented above
3. For protected routes, add header:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

## Security Considerations

### Implemented
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 7-day expiration
- Password reset tokens with 30-minute expiration
- CORS configured for frontend origin only
- User data isolated by userId in database queries
- Input validation on all routes

### For Production
- Use environment-specific JWT secrets
- Enable HTTPS only
- Use secure cookie settings
- Implement rate limiting on auth endpoints
- Set up email service for password reset
- Use database connection pooling
- Monitor error logs regularly

## Assumptions Made

1. **No Email Service:** Password reset tokens are logged to console in development. In production, implement email service to send reset links.

2. **Simple Authentication:** Uses JWT tokens stored in localStorage. For higher security, consider refresh token rotation and httpOnly cookies.

3. **Single Device Session:** Each login generates a new token. Previous tokens remain valid until expiration.

4. **No Role-Based Access:** All authenticated users have same permissions. Todos are completely isolated by userId.

5. **Frontend Only Routing:** No API-level route protection. Authentication validation happens on frontend using token presence.

6. **No Rate Limiting:** Currently no protection against brute force attacks. Should be added in production.

7. **Timestamps in UTC:** All timestamps stored in UTC and displayed as-is. Frontend could format for user timezone.

## Troubleshooting

### MongoDB Connection Error
- Check IP is whitelisted in MongoDB Atlas
- Verify connection string format in `.env`
- Ensure username and password are correct and URL-encoded
- Wait 1-2 minutes after whitelisting IP

### Frontend Cannot Reach Backend
- Verify backend is running on port 5000
- Check `.env` has correct `REACT_APP_API_URL`
- Check CORS is enabled in backend
- Check browser console for specific errors

### Authentication Issues
- Clear localStorage and refresh browser
- Check JWT_SECRET matches between sessions
- Verify token is being sent in Authorization header
- Check token has not expired (7 days)

### Todo Not Appearing
- Refresh the page
- Check browser console for errors
- Verify user is logged in
- Check MongoDB has data in todos collection

## Development Notes

### Code Style
- TypeScript strict mode enabled
- Consistent naming conventions
- Separation of concerns across files
- Reusable components and hooks

### Error Handling
- All async operations wrapped in try-catch
- User-friendly error messages in frontend
- Detailed error logging in backend

### Performance
- React Query caches data with 30-second stale time
- Lazy loading of routes with React Router
- MongoDB indexes on frequently queried fields

## Future Enhancements

- Email notifications for password reset
- Todo categories or tags
- Shared todos with other users
- Recurring todos
- Todo priority levels
- Dark mode theme
- Mobile app version
- Real-time updates with WebSockets
- Two-factor authentication
- Backup and restore functionality

## License

This project is created for educational purposes.

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review error logs in MongoDB ErrorLog collection
3. Check browser console for frontend errors
4. Check terminal output for backend errors

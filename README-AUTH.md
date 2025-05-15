# Build Gaming Authentication System

This document explains how to set up and use the authentication system in the Build Gaming project.

## Setup Instructions

1. **Set up environment variables**:
   Run the setup script to create the `.env` file with necessary configuration:
   ```
   node setup-env.js
   ```

2. **Set up the database**:
   Make sure PostgreSQL is installed and running. Then run:
   ```
   node setup-db.js
   ```
   This will:
   - Generate the Prisma client
   - Push the database schema to your PostgreSQL database

   If you encounter errors, you may need to:
   - Create the `buildgaming` database manually
   - Update the connection string in `.env` file with your PostgreSQL credentials

3. **Start the development server**:
   ```
   npm run dev
   ```

## Authentication Flow

The authentication system uses JWT (JSON Web Tokens) for stateless authentication:

1. **Sign up**:
   - User creates an account via `/signup` page
   - Password is hashed with bcrypt before storing in database
   - User is redirected to login page on successful signup

2. **Login**:
   - User provides credentials via `/login` page
   - System verifies email/password against database
   - Upon successful login, JWT token is generated and stored in localStorage
   - User information is stored in AuthContext

3. **Authentication State**:
   - `AuthContext` maintains user state throughout the application
   - Components can access auth state via `useAuth()` hook
   - Protected routes redirect to login if user is not authenticated

4. **Logout**:
   - Removes JWT token from localStorage
   - Clears user state from AuthContext
   - Redirects to home page

5. **Profile Management**:
   - Users can view their profile information at `/profile`
   - Future: Edit profile, change password functionality

## API Endpoints

- `POST /api/auth/signup`: Create a new user account
- `POST /api/auth/login`: Authenticate a user and get JWT token
- `GET /api/auth/me`: Get current user information (requires Authorization header)

## Troubleshooting

- **Database Connection Issues**: Check your PostgreSQL server is running and credentials in `.env` are correct
- **Prisma Client Issues**: If you see errors about Prisma client not being generated, run `npx prisma generate`
- **JWT Token Issues**: Make sure `JWT_SECRET` is properly set in your `.env` file

## Security Considerations

- Passwords are hashed with bcrypt
- JWT tokens have an expiration time (default: 7 days)
- Authentication state is checked on app startup
- Protected routes redirect unauthenticated users 

# 🎬 Movie Explorer – Discover Your Favorite Films

Movie Explorer is a modern full-stack web application that allows users to search, explore, and favorite movies. It integrates with The Movie Database (TMDB) API on the frontend and uses Express.js with MongoDB on the backend for user authentication and favorite movie storage.

---

## 🔧 Tech Stack

### Frontend
- React (with Vite)
- React Router DOM
- CSS (dark/light theme support)
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT-based authentication (optional)
- CORS, dotenv, morgan (for API security and debugging)

---

## 📁 Project Structure

### `/frontend`
- `App.jsx` – App layout, routes
- `components/` – Reusable UI components like `Header`, `MovieCard`, `MovieGrid`
- `pages/` – Pages like `Home`, `Favorites`, `MovieDetail`, `Login`, `Register`
- `context/` – Global state for user and favorites
- `styles/` – Global and component-specific CSS
- `main.jsx` – App entry point

### `/backend`
- `server.js` – Entry point for Express server
- `models/User.js` – Mongoose schema for user and favorites
- `routes/userRoutes.js` – API endpoints for user auth and favorites
- `controllers/userController.js` – Business logic for each route
- `middleware/authMiddleware.js` – Auth protection
- `utils/db.js` – MongoDB connection

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sigallage/Movie-Explorer-App.git
cd movie-explorer

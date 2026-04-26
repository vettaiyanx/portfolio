# Suriya P - Cyber Nexus Portfolio

A futuristic, 3D-immersive portfolio built with a Cyber-Nexus aesthetic.

## Architecture
- **Frontend**: HTML5, CSS3 (Cyberpunk Industrial), JavaScript, Three.js (Background & Core), GSAP (Transitions).
- **Backend**: Node.js, Express.js (Contact Form Handler).

## Deployment Instructions

### 1. Backend (Render - Free Tier)
Render is great for Node.js backends.
- Create a new **Web Service** on [Render](https://render.com/).
- Connect your GitHub repository.
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Environment Variables**: Add any secrets if needed later.
- Copy your Render URL (e.g., `https://suriya-api.onrender.com`).

### 2. Frontend (Vercel - Free Tier)
Vercel is the best for high-performance frontend.
- Go to [Vercel](https://vercel.com/).
- Import your repository.
- **Root Directory**: `frontend`
- **Build Command**: (Leave blank or `npm run build` if using a framework)
- **Output Directory**: `.` (Current directory)
- **Update API URL**: Open `frontend/script.js` and update the `fetch` URL from `localhost:5000` to your Render URL.

### 3. GitHub (Source Control)
- Initialize Git: `git init`
- Add files: `git add .`
- Commit: `git commit -m "Initial Cyber-Nexus Deploy"`
- Create a repo on GitHub and push.

## Local Development
1. Start Backend: `cd backend && node server.js`
2. Open Frontend: Open `frontend/index.html` in a browser or use a live server.

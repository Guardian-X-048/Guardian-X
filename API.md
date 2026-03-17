# GuardianX 2.0 Installation Guide

## Prerequisites

### System Requirements
- **OS**: macOS, Linux, Windows (WSL2 recommended)
- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **Python**: 3.9+ (for AI models)
- **RAM**: 8GB minimum (16GB recommended)
- **GPU**: NVIDIA GPU with CUDA 11.0+ (optional for production)

### Required Accounts
- IntelX API Key ([Get one here](https://intelx.io))
- NVIDIA API Key ([Get one here](https://developer.nvidia.com))

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/GuardianX-2.0.git
cd GuardianX-2.0
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp ../.env.example .env

# Edit .env with your API keys
nano .env
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

### 4. AI Models Setup (Optional)

```bash
cd ../ai-models

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install ML dependencies
pip install -r requirements.txt
```

### 5. Environment Configuration

Edit `.env` in the backend folder:

```env
# Required for IntelX integration
INTELX_API_KEY=your_intelx_key_here

# Required for NVIDIA AI
NVIDIA_API_KEY=your_nvidia_key_here

# Optional
MONGODB_URI=mongodb://localhost:27017/guardianx
PORT=3001
NODE_ENV=development
```

### 6. Running the Application

#### Development Mode

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:3001`

#### Production Mode

```bash
# Build frontend
cd frontend
npm run build

# The build output is in frontend/dist/
# Serve with Express in production
cd backend
NODE_ENV=production npm start
```

### 7. NVIDIA Triton Setup (Optional)

For production GPU acceleration:

```bash
# Pull Triton Docker image
docker pull nvcr.io/nvidia/tritonserver:23.01-py3

# Run Triton server
docker run --gpus=1 --rm -p 8000:8000 -p 8001:8001 \
  -v /path/to/ai-models:/models \
  nvcr.io/nvidia/tritonserver:23.01-py3 \
  tritonserver --model-repository=/models
```

## Verification

After installation, verify everything is working:

```bash
# Check backend health
curl http://localhost:3001/health

# Should return:
# {"status":"healthy","timestamp":"...","services":{"intelx":"connected","nvidia":"ready","database":"connected"}}
```

## Common Issues

### Port Already in Use
```bash
# Find process using port
lsof -i :3001
# or
netstat -ano | findstr :3001

# Kill the process
kill -9 <PID>
```

### MongoDB Connection Error
MongoDB is optional. The app will run with in-memory data if MongoDB is not available.

### IntelX/NVIDIA Demo Mode
If API keys are not configured, the app runs in demo mode with simulated data. This is perfect for development and presentations.

## Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## Railway/Heroku Deployment

The project includes a `Procfile` for easy deployment:

```bash
# Install Heroku CLI
heroku login

# Create heroku app
heroku create guardianx-app

# Set environment variables
heroku config:set INTELX_API_KEY=your_key
heroku config:set NVIDIA_API_KEY=your_key

# Deploy
git push heroku main
```

---

For additional help, see [API.md](API.md) or open an issue.

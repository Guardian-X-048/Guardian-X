# GuardianX 2.0 🛡️

> AI-Powered Cybersecurity Dashboard with IntelX Breach Data & NVIDIA GPU Acceleration

![GuardianX](https://img.shields.io/badge/GuardianX-2.0-cyan?style=for-the-badge)
![IntelX](https://img.shields.io/badge/IntelX-Integrated-purple?style=for-the-badge)
![NVIDIA](https://img.shields.io/badge/NVIDIA-A100%20Accelerated-green?style=for-the-badge)

## 🚀 Overview

GuardianX 2.0 is a next-generation security operations center (SOC) dashboard that leverages:
- **IntelX** for real-time breach data feeds and dark web monitoring
- **NVIDIA GPU Acceleration** for AI-powered threat detection and risk scoring
- **Live Threat Visualization** with interactive attack vector graphs

Designed for hackathon demonstrations and enterprise security teams.

## ✨ Features

### Core Capabilities
- **Live Breach Alert Feed** - Real-time alerts with severity scoring and filtering
- **AI Risk Score Dashboard** - Dynamic risk assessment with trend analysis
- **Threat Vector Prediction** - GPU-accelerated ML models predicting attack patterns
- **Interactive Threat Graph** - Visual representation of attack paths and vectors
- **NVIDIA Triton Integration** - Production-ready inference pipeline

### Technical Highlights
- ⚡ Sub-50ms AI inference latency
- 📊 Real-time data visualization with Recharts
- 🔒 Enterprise-grade security middleware
- 📈 Scalable microservices architecture

## 🏗️ Architecture

```
GuardianX-2.0/
├── backend/                  # Node.js/Express API
│   ├── server.js             # Main entry point
│   ├── routes/               # API endpoints
│   ├── controllers/          # Business logic
│   ├── utils/                # IntelX & NVIDIA clients
│   └── config/               # Database configuration
│
├── frontend/                 # React Dashboard
│   ├── src/
│   │   ├── components/       # UI Components
│   │   └── services/         # API integration
│   └── package.json
│
├── ai-models/                # NVIDIA Accelerated Models
│   ├── phishing-detector/    # NLP-based detection
│   ├── breach-risk/           # Risk scoring model
│   └── triton-config/        # Triton server configs
│
└── docs/                     # Documentation
```

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- Recharts
- Lucide Icons

### Backend
- Node.js + Express
- MongoDB (optional)
- JWT Authentication

### AI/ML
- NVIDIA Triton Inference Server
- TensorRT Optimization
- Python ML Models

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- NVIDIA GPU (optional, for production)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/GuardianX-2.0.git
cd GuardianX-2.0

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API keys
```

### Running the Application

```bash
# Start backend (terminal 1)
cd backend
npm run dev

# Start frontend (terminal 2)
cd frontend
npm run dev
```

### Environment Variables

```env
# IntelX Configuration
INTELX_API_KEY=your_intelx_api_key
INTELX_API_URL=https://2.intelx.io

# NVIDIA Configuration
NVIDIA_API_KEY=your_nvidia_api_key
TRITON_URL=http://localhost:8000

# Database
MONGODB_URI=mongodb://localhost:27017/guardianx

# App Configuration
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## 📡 API Endpoints

### Alerts
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/alerts` | GET | List all alerts (paginated) |
| `/api/alerts/:id` | GET | Get single alert |
| `/api/alerts/:id/dismiss` | POST | Dismiss an alert |

### IntelX Integration
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/intelx/search` | GET | Search breach database |
| `/api/intelx/breaches` | GET | Get recent breaches |
| `/api/intelx/stats` | GET | Breach statistics |

### NVIDIA AI
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/nvidia/phishing-detect` | POST | Detect phishing content |
| `/api/nvidia/risk-score` | POST | Calculate risk score |
| `/api/nvidia/predictions/attack-vectors` | GET | Get attack predictions |

## 🤖 AI Models

### Phishing Detector
- NLP-based classification model
- Input: URL, email content, sender info
- Output: Probability score, confidence, indicators

### Breach Risk Scorer
- Multi-factor risk assessment
- Considers: external threats, internal factors, history
- GPU-accelerated inference via Triton

### Attack Vector Predictor
- Time-series forecasting of threat patterns
- Industry-specific risk analysis
- Trend detection and alerting

## 🎯 Demo Script

For hackathon demonstrations:

1. **Opening** (30s)
   - Show the live dashboard with animated threat graph
   - Highlight the "Live Feed Active" indicator

2. **Breach Alert Demo** (1min)
   - Click on a critical alert
   - Show expanded details with affected data
   - Demonstrate filtering and search

3. **AI Features** (1min)
   - Show the risk score gauge animation
   - Display NVIDIA inference latency
   - Highlight AI model accuracy metrics

4. **Threat Graph** (30s)
   - Hover over nodes to show details
   - Demonstrate animated data flow

5. **Closing** (30s)
   - Mention IntelX and NVIDIA integrations
   - Point to GitHub for technical details

## 📊 Performance

| Metric | Value |
|--------|-------|
| AI Inference Latency | <50ms |
| Frontend Load Time | <2s |
| API Response Time | <100ms |
| Concurrent Users | 1000+ |

## 🔒 Security

- Helmet.js security headers
- Rate limiting (1000 req/15min)
- CORS configuration
- Input validation
- JWT authentication (optional)

## 📝 License

MIT License - See [LICENSE](LICENSE) for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

Built with ❤️ for the cybersecurity community

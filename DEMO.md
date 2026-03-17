# GuardianX 2.0 API Documentation

## Base URL
```
Production: https://api.guardianx.io
Development: http://localhost:3001
```

## Authentication

Currently using API keys in headers (JWT coming soon):

```
X-API-Key: your_api_key
```

## Response Format

All responses follow this structure:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "count": 10,
    "latency": "12ms"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

---

## Alert Endpoints

### List Alerts
Retrieves a paginated list of breach alerts.

**Endpoint:** `GET /api/alerts`

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | integer | 1 | Page number |
| pageSize | integer | 10 | Items per page (max 100) |
| severity | string | all | Filter: critical, high, medium, low |
| type | string | all | Filter: Data Breach, Phishing, etc. |
| sort | string | timestamp | Sort by: timestamp, riskScore |

**Example:**
```bash
curl "http://localhost:3001/api/alerts?page=1&pageSize=10&severity=critical"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "ALT-1699574400-0",
      "type": "Data Breach",
      "severity": "critical",
      "source": "IntelX",
      "title": "Healthcare Provider Data Exposed",
      "description": "Potential security incident detected...",
      "affectedData": ["Email addresses", "Hashed passwords", "IP addresses"],
      "timestamp": "2024-01-15T10:30:00.000Z",
      "riskScore": 92,
      "location": "US",
      "status": "active"
    }
  ],
  "meta": {
    "total": 156,
    "page": 1,
    "pageSize": 10,
    "totalPages": 16
  }
}
```

### Get Alert by ID
```bash
curl "http://localhost:3001/api/alerts/ALT-1699574400-0"
```

### Dismiss Alert
```bash
curl -X POST "http://localhost:3001/api/alerts/ALT-1699574400-0/dismiss"
```

---

## IntelX Integration

### Search Breaches
**Endpoint:** `GET /api/intelx/search`

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | Yes | Search term |
| page | integer | No | Page number |
| pageSize | integer | No | Results per page |

### Get Recent Breaches
**Endpoint:** `GET /api/intelx/breaches`

### Get Breach Statistics
**Endpoint:** `GET /api/intelx/stats`

---

## NVIDIA AI Endpoints

### Phishing Detection
Analyzes content for phishing indicators using GPU-accelerated inference.

**Endpoint:** `POST /api/nvidia/phishing-detect`

**Request Body:**
```json
{
  "content": "Your email or message content...",
  "url": "https://suspicious-link.com",
  "sender": "sender@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "isPhishing": true,
    "confidence": 0.94,
    "score": 0.82,
    "indicators": [
      { "type": "url_shortener", "severity": "medium" }
    ],
    "model": "phishing-detector-v2.1",
    "inferenceTime": "45ms"
  }
}
```

### Risk Scoring
Calculates overall risk score based on multiple factors.

**Endpoint:** `POST /api/nvidia/risk-score`

**Request Body:**
```json
{
  "indicators": [
    { "name": "externalThreats", "value": 75, "weight": 0.4 },
    { "name": "internalVulnerabilities", "value": 45, "weight": 0.3 },
    { "name": "historicalIncidents", "value": 60, "weight": 0.3 }
  ]
}
```

### Attack Vector Predictions
**Endpoint:** `GET /api/nvidia/predictions/attack-vectors`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "vector": "Phishing Email Campaign",
      "probability": 0.82,
      "affectedIndustry": "Financial Services",
      "trend": "increasing",
      "mitigation": "Enable email filtering + user training"
    }
  ],
  "meta": {
    "model": "attack-vector-predictor-v3.0",
    "generatedAt": "2024-01-15T10:30:00.000Z",
    "confidence": 94.2
  }
}
```

### Model Status
**Endpoint:** `GET /api/nvidia/models/status`

---

## Dashboard Endpoints

### Get Statistics
**Endpoint:** `GET /api/stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalAlerts": 156,
    "criticalCount": 12,
    "avgRiskScore": 68,
    "aiAccuracy": 94.7,
    "threatsBlocked": 12847,
    "uptime": 99.97,
    "nvidiaLatency": 12
  }
}
```

### Get Risk Score
**Endpoint:** `GET /api/risk-score`

### Get Threat Graph
**Endpoint:** `GET /api/threat-graph`

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| NOT_FOUND | 404 | Resource not found |
| MISSING_QUERY | 400 | Required query parameter missing |
| MISSING_DATA | 400 | Required request body missing |
| RATE_LIMIT | 429 | Too many requests |
| INFERENCE_ERROR | 500 | AI model inference failed |
| INTERNAL_ERROR | 500 | Unexpected server error |

---

## Rate Limits

| Endpoint Group | Limit |
|----------------|-------|
| General API | 1000 requests / 15 minutes |
| IntelX Search | 100 requests / 15 minutes |
| NVIDIA Inference | 500 requests / 15 minutes |

---

For support, contact support@guardianx.io

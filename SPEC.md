# GuardianX 2.0 - AI-Powered Cybersecurity Dashboard

## Concept & Vision

GuardianX 2.0 is a cutting-edge cybersecurity command center that transforms raw breach data from IntelX into actionable intelligence using NVIDIA GPU-accelerated AI. The dashboard feels like stepping into a cyber defense operations room—dark, sleek, with pulsing threat indicators and real-time data streams that make users feel empowered rather than overwhelmed. It's the difference between reading a police report and being the hero who stops the crime.

## Design Language

### Aesthetic Direction
**"Tactical Operations Center"** - Inspired by military-grade command interfaces and sci-fi HUDs (think Minority Report meets DEFCON). Dense information hierarchy with glowing accents that draw attention to what matters.

### Color Palette
- **Background Primary**: `#0a0e17` (Deep space black)
- **Background Secondary**: `#111827` (Card surfaces)
- **Background Tertiary**: `#1f2937` (Elevated elements)
- **Accent Cyan**: `#06b6d4` (Primary actions, highlights)
- **Accent Emerald**: `#10b981` (Safe/Low risk)
- **Accent Amber**: `#f59e0b` (Medium risk, warnings)
- **Accent Red**: `#ef4444` (Critical threats)
- **Accent Purple**: `#8b5cf6` (AI/ML features)
- **Text Primary**: `#f9fafb`
- **Text Secondary**: `#9ca3af`
- **Text Muted**: `#6b7280`

### Typography
- **Primary**: `Inter` - Clean, technical readability
- **Monospace**: `JetBrains Mono` - Data, logs, code snippets
- **Fallbacks**: `system-ui, -apple-system, sans-serif`

### Spatial System
- Base unit: 4px
- Component padding: 16px / 24px
- Card gaps: 24px
- Section margins: 48px
- Border radius: 8px (cards), 6px (buttons), 4px (inputs)

### Motion Philosophy
- **Data updates**: Subtle pulse animations (opacity 0.7→1, 300ms) to draw attention without alarm
- **New alerts**: Slide-in from right with glow effect (400ms ease-out)
- **Risk meters**: Animated fill with easing (600ms cubic-bezier)
- **Hover states**: Scale 1.02 with box-shadow elevation (150ms)
- **Loading**: Skeleton shimmer with cyan tint

### Visual Assets
- **Icons**: Lucide React (consistent, modern line icons)
- **Charts**: Recharts with custom dark theme
- **Threat graph**: Custom SVG with animated connection lines
- **Decorative**: Subtle grid pattern overlay, scanline effects on headers

## Layout & Structure

### Page Architecture

**Landing Page (`/`)**
- Hero with animated threat map background
- Value proposition with feature cards
- Live mini-dashboard preview
- Call-to-action to access full dashboard

**Dashboard (`/dashboard`)**
- Fixed sidebar navigation (collapsible)
- Top bar with search, notifications, user menu
- Main grid: 
  - Left column (70%): Breach alerts feed, threat graph
  - Right column (30%): Risk scores, quick stats, AI predictions
- Bottom section: Analytics charts, recent activity timeline

**About Page (`/about`)**
- Project architecture diagram
- Technology stack showcase
- Team/cloaked hackers manifest
- Integration documentation links

### Responsive Strategy
- Desktop-first (1440px optimal)
- Tablet: Stack right column below main content
- Mobile: Bottom navigation, card-based layout

## Features & Interactions

### Core Features

**1. Live Breach Alert Feed**
- Real-time updates from IntelX API (simulated)
- Each alert shows: source, type, affected data, severity, timestamp
- Click to expand: full details, related alerts, recommended actions
- Filter by: severity, type, date range, industry
- Sort by: time, risk score, impact

**2. AI Risk Score Dashboard**
- Per-organization risk scoring (0-100)
- Breakdown by attack vector probability
- NVIDIA inference latency display
- Historical trend chart

**3. Threat Vector Prediction Graph**
- Interactive network graph showing:
  - Attack paths and vectors
  - Geographic distribution
  - Industry-specific threats
- Hover for details, click to drill down

**4. Attack Vector Predictions**
- AI-generated predictions using NVIDIA Triton
- Phishing attempt probability
- Data exfiltration risk assessment
- Recommendations based on current threat landscape

### Interaction Details

**Alert Card Hover**
- Elevate with shadow
- Show quick action buttons (View, Dismiss, Investigate)
- Pulse border with severity color

**Risk Score Animation**
- On load: Count up from 0 to current value
- Color transitions based on thresholds
- Subtle particle effect for critical scores

**Search**
- Debounced input (300ms)
- Search across all breach data
- Highlight matching terms in results

### Edge Cases
- **No alerts**: "All clear" state with reassurance message
- **API failure**: Graceful degradation with cached data + error banner
- **Loading**: Skeleton screens matching final layout
- **Empty search**: Suggestions for popular searches

## Component Inventory

### BreachAlertCard
- **Default**: Dark card with severity indicator stripe
- **Hover**: Elevated, action buttons appear
- **Expanded**: Full-width with detailed info
- **Critical**: Red glow pulse animation

### RiskScoreGauge
- **Visual**: Semi-circular gauge with gradient fill
- **States**: Low (green), Medium (amber), High (red), Critical (pulsing red)
- **Animation**: Smooth fill on value change

### ThreatGraph
- **Nodes**: Circular with icon center
- **Edges**: Animated dashed lines showing threat flow
- **Interaction**: Drag to rearrange, zoom/pan

### StatCard
- **Layout**: Icon, label, value, trend indicator
- **Trend**: Up/down arrow with percentage
- **Hover**: Subtle glow effect

### NavSidebar
- **Default**: Icon + label, muted text
- **Active**: Cyan accent, background highlight
- **Hover**: Light background tint

### SearchBar
- **Default**: Dark input with search icon
- **Focus**: Cyan border glow
- **Loading**: Spinner replaces search icon

## Technical Approach

### Frontend Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS with custom config
- **State**: React hooks + Context for global state
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: In-memory store (production would use MongoDB)
- **API Style**: REST with JSON responses

### AI/ML Integration
- **Inference**: NVIDIA Triton-compatible endpoints (simulated)
- **Models**: Phishing detection, breach risk scoring
- **Acceleration**: GPU-ready architecture (simulated for demo)

### API Design

**Endpoints**

```
GET  /api/alerts              - List breach alerts (paginated)
GET  /api/alerts/:id          - Single alert details
GET  /api/risk-score          - Current risk metrics
GET  /api/predictions         - AI attack vector predictions
GET  /api/threat-graph        - Network threat data
GET  /api/stats               - Dashboard statistics
POST /api/alerts/:id/dismiss  - Dismiss an alert
```

**Response Format**
```json
{
  "success": true,
  "data": { ... },
  "meta": { "count": 42, "latency": "12ms" }
}
```

**Error Format**
```json
{
  "success": false,
  "error": { "code": "NOT_FOUND", "message": "Alert not found" }
}
```

### Data Models

**Breach Alert**
- id, source, type, severity, title, description
- affectedData[], impactedEntities, timestamp
- riskScore, recommendedActions, status

**Risk Score**
- overallScore, phishingProbability
- exfiltrationRisk, attackVectorScores{}
- historicalTrends[], lastUpdated

**User Preferences**
- theme, notificationSettings, favoriteFilters

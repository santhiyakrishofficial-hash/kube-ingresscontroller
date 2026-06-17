# 🚀 KidSkills - Kids Skill Development App

A full-stack application for kids to develop skills through fun learning activities, earn points, and track progress!

## 🏗️ Architecture

```
ingress-implementation/
├── client/                  # React + Vite Frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── api.js           # API service layer
│   │   ├── App.jsx          # Main app with routing
│   │   ├── index.css        # Design system
│   │   └── main.jsx         # Entry point
│   ├── nginx.conf           # Nginx config for production
│   ├── Dockerfile           # Multi-stage Docker build
│   └── package.json
├── server/                  # Node.js + Express Backend
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── index.js             # Express server
│   ├── Dockerfile           # Docker build
│   └── package.json
├── k8s/                     # Kubernetes manifests
│   ├── namespace.yaml
│   ├── mongo.yaml           # MongoDB Deployment + PVC + Service
│   ├── server.yaml          # Backend Deployment + Service
│   ├── client.yaml          # Frontend Deployment + Service
│   └── ingress.yaml         # NGINX Ingress Controller
├── docker-compose.yml       # Local development
└── README.md
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | MongoDB |
| Containerization | Docker |
| Orchestration | Kubernetes |
| Ingress | NGINX Ingress Controller |

---

## 📦 Local Development with Docker Compose

### 1. Build & Run
```bash
docker-compose up --build
```

### 2. Access
- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000/api/health

### 3. Stop
```bash
docker-compose down
```

---

## 🐳 Push Images to Docker Hub

### 1. Login to Docker Hub
```bash
docker login
```

### 2. Build images with your Docker Hub username
```bash
# Set your Docker Hub username
export DOCKER_USERNAME=yourdockerhubusername

# Build images
docker-compose build

# Or build individually
docker build -t $DOCKER_USERNAME/kids-skills-server:latest ./server
docker build -t $DOCKER_USERNAME/kids-skills-client:latest ./client
```

### 3. Push to Docker Hub
```bash
docker push $DOCKER_USERNAME/kids-skills-server:latest
docker push $DOCKER_USERNAME/kids-skills-client:latest
```

---

## ☸️ Kubernetes Deployment with Ingress

### Prerequisites
- Kubernetes cluster (minikube, kind, EKS, GKE, AKS, etc.)
- kubectl configured
- NGINX Ingress Controller installed

### 1. Install NGINX Ingress Controller

**For cloud providers:**
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.1/deploy/static/provider/cloud/deploy.yaml
```

**For minikube:**
```bash
minikube addons enable ingress
```

### 2. Update image names in K8s manifests
Replace `yourdockerhubusername` with your actual Docker Hub username in:
- `k8s/server.yaml` → `image: yourdockerhubusername/kids-skills-server:latest`
- `k8s/client.yaml` → `image: yourdockerhubusername/kids-skills-client:latest`

### 3. Deploy to Kubernetes
```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Deploy MongoDB
kubectl apply -f k8s/mongo.yaml

# Deploy Backend
kubectl apply -f k8s/server.yaml

# Deploy Frontend
kubectl apply -f k8s/client.yaml

# Create Ingress
kubectl apply -f k8s/ingress.yaml
```

**Or deploy everything at once:**
```bash
kubectl apply -f k8s/
```

### 4. Verify Deployments
```bash
kubectl get all -n kids-skills
kubectl get ingress -n kids-skills
```

### 5. Access the App

**For minikube:**
```bash
# Get minikube IP
minikube ip

# Add to /etc/hosts (Linux/Mac) or C:\Windows\System32\drivers\etc\hosts (Windows)
<minikube-ip> kidskills.local
```

**For cloud (LoadBalancer):**
```bash
# Get the external IP of the ingress
kubectl get ingress -n kids-skills
# Access via: http://<EXTERNAL-IP>
```

Then open: **http://kidskills.local** in your browser.

---

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/skills` | Get all skills |
| POST | `/api/skills/seed` | Seed default skills |
| GET | `/api/activities` | Get all activities |
| POST | `/api/activities` | Create activity |
| GET | `/api/children` | Get all children (leaderboard) |
| POST | `/api/children` | Create child profile |
| POST | `/api/children/:id/complete-activity` | Complete an activity |

---

## 🎨 Features

- 🌈 **7 Skill Categories**: Reading, Math, Art, Music, Coding, Science, Sports
- 🎮 **Fun Activities**: Create and complete learning activities
- 📊 **Progress Tracking**: XP, levels, and badges
- 🏆 **Leaderboard**: Friendly competition among learners
- 👶 **Child Profiles**: Personalized avatars and progress
- 🌙 **Beautiful Dark Theme**: Premium UI with animations

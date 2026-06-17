# ─── Server Dockerfile ───
FROM node:20-alpine

WORKDIR /app

# Copy dependency files first for better caching
COPY package*.json ./

RUN npm install --production

# Copy application code
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]

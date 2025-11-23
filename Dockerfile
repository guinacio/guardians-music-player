# Stage 1: Build the application
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production runtime
FROM node:20-slim AS runner

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy built application and server script
COPY --from=builder /app/dist ./dist
COPY server.js ./

# Cloud Run requires the app to listen on PORT environment variable
ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

# Run server that serves static files
CMD ["node", "server.js"]


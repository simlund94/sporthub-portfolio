# Stage 1: Build the React + Vite app
FROM ubuntu:latest AS build

LABEL authors="emil"

# Install Node.js, npm, git
RUN apt-get update && \
    apt-get install -y curl git build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build production
RUN npm run build

# Stage 2: Serve with Nginx
FROM ubuntu:latest

# Install Nginx
RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

# Remove default site to avoid welcome page
RUN rm -f /etc/nginx/sites-enabled/default

# Copy React build to Nginx html folder
COPY --from=build /app/dist /var/www/html

# Copy custom Nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

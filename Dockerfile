FROM node:20-alpine AS build

WORKDIR /app

# Copy root configurations
COPY package*.json ./
COPY turbo.json ./

# Copy Website specific files
COPY Website/package.json ./Website/

# Install dependencies
RUN npm install

# Copy source
COPY Website ./Website

# Build the website
WORKDIR /app/Website
RUN npm run build

# Serve with nginx
FROM nginx:alpine
COPY --from=build /app/Website/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

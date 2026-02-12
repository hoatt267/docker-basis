# --- Stage 1: Build (Dùng Node để đóng gói) ---
FROM node:18-alpine as build
WORKDIR /app

# Build arguments for environment variables
ARG VITE_API_URL

# Set environment variables for build
ENV VITE_API_URL=$VITE_API_URL

# Copy package.json trước để tận dụng cache
COPY package.json package-lock.json ./
RUN npm install

# Copy toàn bộ code và Build
COPY . .
RUN npm run build

# --- Stage 2: Serve (Dùng Nginx để chạy web) ---
FROM nginx:alpine
# Copy file đã build từ Stage 1 sang folder của Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copy file cấu hình Nginx custom vào
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# ===== Stage 1: Builder =====
FROM node:20-alpine AS builder

# Thư mục làm việc
WORKDIR /app

# Tăng bộ nhớ cho NestJS build
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Copy package files
COPY package*.json ./

# Cài tất cả dependencies (dev + prod) để build TypeScript
RUN yarn install --frozen-lockfile

# Copy toàn bộ source code
COPY . .

# Build NestJS
RUN yarn build

# ===== Stage 2: Production / Dev =====
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Chỉ cài production deps
RUN yarn install --production --frozen-lockfile

# Copy dist từ stage 1
COPY --from=builder /app/dist ./dist

# Copy các thư mục cần thiết khác (uploads, config, .env nếu có)
# COPY --from=builder /app/uploads ./uploads
COPY --from=builder /app/.env ./

EXPOSE 3001

# CMD: chạy app bằng yarn
# Chọn start:dev nếu muốn chạy development, start:prod nếu production
CMD ["yarn", "start:prod"]

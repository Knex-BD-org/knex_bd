# # Step 1: Build the Next.js application
# FROM node:22-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .

# # Disable Next.js telemetry
# ENV NEXT_TELEMETRY_DISABLED=1

# # # --- ALL NEXT_PUBLIC VARIABLES MAPPED HERE ---
# # ARG NEXT_PUBLIC_API_URL
# # ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# # ARG NEXT_PUBLIC_BASE_URL
# # ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

# # ARG NEXT_PUBLIC_FIREBASE_API_KEY
# # ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY

# # ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
# # ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN

# # ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
# # ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID

# # ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
# # ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET

# # ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
# # ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID

# # ARG NEXT_PUBLIC_FIREBASE_APP_ID
# # ENV NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID

# # ARG NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
# # ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
# # ---------------------------------------------

# # Compile the application (This bakes the variables into the JS files)
# RUN npm run build

# # Step 2: Production Runner
# FROM node:22-alpine AS runner
# WORKDIR /app
# ENV NODE_ENV=production

# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules

# EXPOSE 3000
# CMD ["npm", "start"]

# FROM node:22-alpine AS builder
# WORKDIR /app

# COPY package*.json ./
# RUN npm ci

# COPY . .

# ENV NEXT_TELEMETRY_DISABLED=1
# RUN npm run build


# FROM node:22-alpine AS runner
# WORKDIR /app
# ENV NODE_ENV=production

# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/next.config.* ./

# RUN npm ci --omit=dev

# EXPOSE 3000
# CMD ["npm", "start"]



# -------------------------
# Builder Stage
# -------------------------
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build


# -------------------------
# Runner Stage (Production)
# -------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy standalone output (THIS is the key)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
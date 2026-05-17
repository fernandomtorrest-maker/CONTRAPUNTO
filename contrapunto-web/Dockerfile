# ==========================================
# Constructora Contrapunto — Dockerfile
# Optimizado para Next.js standalone en VPS Ubuntu
# Build: docker build -t contrapunto-web .
# ==========================================

# Etapa 1: Dependencias base
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar manifests de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias de producción solamente
RUN npm ci --only=production && npm cache clean --force


# Etapa 2: Build de la aplicación
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar dependencias de producción
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fuente
COPY . .

# Variables de entorno para el build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Instalar todas las dependencias (dev incluidas) para el build
RUN npm ci && npm run build


# Etapa 3: Imagen de producción mínima
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Crear usuario no-root por seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos públicos estáticos
COPY --from=builder /app/public ./public

# Ajustar permisos para el cache de Next.js
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copiar el standalone build (optimizado por next.config.js output: 'standalone')
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Health check para Docker Swarm / load balancers
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]

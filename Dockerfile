FROM node:22.22.0

WORKDIR /task_web

COPY package.json package-lock.json ./

RUN npm ci

# Copy source
COPY . .

# Next.js telemetry off
ENV NEXT_TELEMETRY_DISABLED=1

# Ensure correct permissions
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
RUN chown -R appuser:appgroup /task_web
USER appuser

EXPOSE 3000

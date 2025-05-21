# Stage 1: Build
# wählt alpine als buildgrundlage und sorgt dafür, dass das vom betriebssystem passend emuliert wird
# wenn ich basisimage FROM: alpine:latest genommen hätte, wäre node.js nicht drauf 
#Ordner ist das spätere Arbeitsverzeichnis im container
FROM --platform=$BUILDPLATFORM node:24-alpine AS builder  
WORKDIR /app

# 1. Abhängigkeiten installieren
# kopiert nur meine package.json --> nur wenn sich abhängigkeiten ändern läuft npm ci neu
#installierte exakte Versionen aus package-lock.json
COPY package*.json ./
RUN npm ci

# 2. Quellcode kopieren und builden (optional)
COPY . .
# Wenn du TypeScript oder ein Bundling-Tool nutzt, würdest du hier z.B.:
# RUN npm run build

# Stage 2: Runtime
# speziell für plattform arm64 bit 
FROM --platform=linux/arm64 node:24-alpine
WORKDIR /app

# Nur die Laufzeit-Abhängigkeiten und den gebauten Code übernehmen
# Holt nur die fertigen Artefakte (Deps + gebauten Code) aus der builder-Stage und hält das finale Image klein.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist      ./dist   
COPY --from=builder /app/src       ./src     

# Port exposen (Standard-Port deines Backends)
EXPOSE 3050

# Container-Startbefehl
#definiert Startbefehl
CMD ["node","src/index.js"]
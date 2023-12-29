# Étape 1: Construire l'image
FROM node:16 as builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock si vous utilisez yarn)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers sources de l'application dans le conteneur
COPY . .

# Construire l'application
RUN npm run build

# Étape 2: Préparer l'image de production
FROM node:16-slim

WORKDIR /app

# Copier les fichiers de build depuis l'étape de construction
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Exposer le port sur lequel votre application s'exécute
EXPOSE 4000

# Définir la commande pour démarrer votre application
CMD ["node", "dist/app.js"]

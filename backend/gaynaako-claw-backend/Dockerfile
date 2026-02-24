# Backend Dockerfile - Dev & Prod
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer toutes les dépendances (y compris dev pour dev)
RUN npm ci

# Copier le reste du code
COPY . .

# Builder le projet NestJS pour la prod
RUN npm run build

# Exposer le port backend
EXPOSE 3000

# Commande par défaut
# Pour dev : npm run start:dev
# Pour prod : npm run start:prod ou node dist/main.js
CMD ["node", "dist/main.js"]
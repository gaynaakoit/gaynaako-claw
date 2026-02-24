# ---------- Stage dev ----------
FROM node:14-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

# Stage build Angular
FROM node:14-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Stage Nginx
FROM nginx:alpine
COPY --from=build /app/dist/gaynaako-claw-frontend /usr/share/nginx/html
# Supprimer le proxy_pass vers 127.0.0.1
# Si tu veux configurer le server_name pour ton domaine :
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
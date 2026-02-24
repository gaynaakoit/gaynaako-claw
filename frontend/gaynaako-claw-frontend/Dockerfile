# ---------- Stage dev ----------
FROM node:14-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

# ---------- Stage build prod ----------
FROM node:14-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# ---------- Stage nginx prod ----------
FROM nginx:alpine AS prod
COPY --from=build /app/dist/gaynaako-claw-frontend /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# Etapa de construcción (build phase)
FROM node:20-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación React (Vite)
RUN npm run build

# Etapa de servidor (production phase)
FROM nginx:alpine

# Limpiar cualquier configuración estática de nginx existente
RUN rm -rf /usr/share/nginx/html/*

# Copiar la build generada en la primera fase hacia el servidor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada para Nginx que soporte React-Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto
EXPOSE 80

# Iniciar servidor nginx
CMD ["nginx", "-g", "daemon off;"]

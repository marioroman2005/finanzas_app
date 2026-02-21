# Usa la imagen oficial de Node.js en su versión 20 basada en Alpine Linux para que sea ligera
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración de dependencias (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente del proyecto
COPY . .

# Expone el puerto que usará tu aplicación
EXPOSE 4000

# Comando para ejecutar la aplicación en producción
CMD ["npm", "start"]

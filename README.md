# Finanzas SaaS

Plataforma moderna para la gestión de finanzas personales, diseñada para ofrecer un control total sobre tus ingresos, gastos y cuentas bancarias.

## Descripción

Finanzas SaaS es una aplicación web completa que permite a los usuarios administrar su vida financiera de manera eficiente. Construida con una arquitectura robusta y escalable, la aplicación facilita el seguimiento de transacciones, la clasificación de gastos y la visualización del estado financiero en tiempo real.

## Características Principales

- **Autenticación Segura**: Sistema de registro e inicio de sesión protegido con JWT y encriptación de contraseñas.
- **Gestión de Cuentas**: Creación y administración de múltiples tipos de cuentas (banco, efectivo, tarjeta, inversión).
- **Control de Transacciones**: Registro detallado de ingresos y gastos con fechas y descripciones.
- **Categorización Inteligente**: Organización de transacciones por categorías personalizables (Comida, Transporte, vivienda, etc.).
- **Interfaz Moderna**: Diseño responsive y amigable construido con React y Tailwind CSS.

## Tecnologías Utilizadas

### Frontend
- **React**: Biblioteca para construir interfaces de usuario interactivas.
- **Vite**: Entorno de desarrollo de próxima generación.
- **Tailwind CSS**: Framework de utilidad para un diseño rápido y personalizado.
- **React Router**: Enrutamiento dinámico para la aplicación.
- **Axios**: Cliente HTTP para la comunicación con el backend.
- **Lucide React**: Iconografía moderna y ligera.

### Backend
- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework web rápido y minimalista.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.
- **JWT (JSON Web Tokens)**: Estándar para la autenticación segura.
- **Bcrypt**: Librería para el hash de contraseñas.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:
- Node.js (v18 o superior)
- PostgreSQL
- npm (Node Package Manager)

## Instalación y Configuración

Sigue estos pasos para configurar el proyecto localmente.

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/finanzas-saas.git
cd finanzas-saas
```

### 2. Configuración del Backend

Navega al directorio del backend e instala las dependencias:

```bash
cd backend
npm install
```

Crea una base de datos en PostgreSQL llamada `saas_finanzas` y ejecuta el script de esquema para crear las tablas necesarias:

```bash
psql -U postgres -d saas_finanzas -f schema.sql
```

Configura las variables de entorno. Crea un archivo `.env` en la carpeta `backend` basándote en `.env.example`:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=saas_finanzas
DB_PASSWORD=tu_contraseña
DB_PORT=5432
PORT=4000
JWT_SECRET=tu_secreto_seguro
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

### 3. Configuración del Frontend

Abre una nueva terminal, navega al directorio del frontend e instala las dependencias:

```bash
cd ../frontend
npm install
```

Inicia la aplicación:

```bash
npm run dev
```

La aplicación estará disponible en la URL que indique la consola (usualmente http://localhost:5173).

## Estructura del Proyecto

El proyecto sigue una arquitectura MVC (Modelo-Vista-Controlador) en el backend y una estructura basada en componentes en el frontend.

```text
/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Lógica de negocio
│   │   ├── models/        # Modelos de base de datos
│   │   ├── routes/        # Definición de rutas API
│   │   └── index.js       # Punto de entrada
│   └── schema.sql         # Esquema de la base de datos
│
└── frontend/
    ├── src/
    │   ├── components/    # Componentes reutilizables
    │   ├── pages/         # Vistas principales
    │   ├── context/       # Estado global (Auth, Transactions)
    │   └── main.jsx       # Punto de entrada
```

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir lo que te gustaría cambiar.



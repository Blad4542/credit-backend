# Backend: Gestión de Aplicaciones de Registro

Este proyecto es el backend para una aplicación de registro y consulta de solicitudes. Proporciona una API para manejar el flujo de creación, almacenamiento y consulta de registros, configurado para funcionar como una función serverless en Netlify.

## 🚀 Funcionalidades principales

- **Registro de aplicaciones:**

  - Almacena los datos de usuarios, documentos en Base64 y selfies.
  - Verifica duplicados con base en el identificador único del usuario.

- **Consulta paginada:**

  - Devuelve datos paginados para eficientar el consumo en el frontend.

- **Manejo de errores:**

  - Respuestas claras y estructuradas en caso de errores (como conflictos de datos duplicados).

- **CORS habilitado:** Permite solicitudes desde el frontend.

---

## 🛠️ Tecnologías utilizadas

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Base de datos:** Firestore (Google Cloud)
- **Serverless:** [Netlify Functions](https://docs.netlify.com/functions/overview/)
- **Otros:**
  - [Cors](https://www.npmjs.com/package/cors): Para manejo de solicitudes de diferentes orígenes.
  - [Winston](https://www.npmjs.com/package/winston): Para el manejo de logs.
  - [dotenv](https://www.npmjs.com/package/dotenv): Para la configuración de variables de entorno.

---

## 🗂️ Estructura del proyecto

```plaintext
src/
├── functions/              # Funciones serverless para Netlify
│   ├── getApplications.js  # Función para obtener solicitudes
│   ├── createApplication.js # Función para registrar solicitudes
├── utils/                  # Funciones auxiliares (logs, configuración)
├── firebase-config/        # Configuración de Firestore
└── netlify.toml            # Configuración de Netlify
```

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <URL-del-repositorio>
cd backend-app

### 2. Instalar dependencias
```bash
npm install
# o
yarn install

### 3. Configurar Variables de entorno

Crea un archivo .env en la raíz del proyecto con las siguientes claves:

```bash
FIREBASE_PROJECT_ID=<tu-firebase-project-id>
FIREBASE_PRIVATE_KEY=<tu-private-key>
FIREBASE_CLIENT_EMAIL=<tu-client-email>
CORS_ORIGIN=http://localhost:3000 # URL del frontend





const admin = require("firebase-admin");
require("dotenv").config(); // Para cargar las variables de entorno

// Construir el objeto de credenciales
let serviceAccount;

if (process.env.NODE_ENV === "production") {
  // Usar variables de entorno en producción
  serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Importante para manejar saltos de línea
  };
} else {
  // Usar archivo JSON en desarrollo
  serviceAccount = require("./serviceAccountKey.json");
}

// Inicializar Firebase Admin si no está ya inicializado
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      process.env.FIREBASE_DATABASE_URL ||
      "https://creditapp-56a50.firebaseio.com",
  });
}

// Exportar la instancia de Firestore
const db = admin.firestore();
module.exports = db;

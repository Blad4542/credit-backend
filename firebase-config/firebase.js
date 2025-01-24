require("dotenv").config(); // Importa dotenv

const admin = require("firebase-admin");

// Crea un objeto para inicializar Firebase con las variables de entorno
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Escapa los saltos de línea
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// Exporta la instancia de Firestore
const db = admin.firestore();
module.exports = db;

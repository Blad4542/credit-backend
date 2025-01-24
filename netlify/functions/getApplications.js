const db = require("../../firebase-config/firebase");
const logger = require("../../utils/logger");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    logger.info("Starting getApplications function...");
    logger.info("Fetching data from Firestore collection: creditApplications");

    // Obtén los parámetros de paginación de la query string
    const { page = 1, limit = 15 } = event.queryStringParameters || {};
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const offset = (pageNumber - 1) * pageSize;

    // Obtén el total de documentos
    const totalSnapshot = await db.collection("creditApplications").get();
    const totalRecords = totalSnapshot.size;

    // Obtén los documentos para la página actual
    const snapshot = await db
      .collection("creditApplications")
      .orderBy("createdAt") // Ordena por fecha de creación
      .offset(offset)
      .limit(pageSize)
      .get();

    if (snapshot.empty) {
      logger.warn("No applications found for the current page.");
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
        body: JSON.stringify({ data: [], totalRecords }),
      };
    }

    logger.info(`Applications retrieved: ${snapshot.docs.length}`);

    const applications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify({ data: applications, totalRecords }),
    };
  } catch (error) {
    logger.error(`Error getting the applications: ${error}`);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify({ error: "Error getting the applications" }),
    };
  }
};

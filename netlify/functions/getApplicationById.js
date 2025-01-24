const db = require("../../firebase-config/firebase");
const logger = require("../../utils/logger");

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    logger.info("Getting application by id");
    const { id } = event.queryStringParameters; // Obtenemos el ID de los parámetros
    const doc = await db.collection("creditApplications").doc(id).get();

    if (!doc.exists) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Application not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ id: doc.id, ...doc.data() }),
    };
  } catch (error) {
    logger.error(`Error getting the application: ${error}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error getting the application" }),
    };
  }
};

const db = require("../../firebase-config/firebase");
const logger = require("../../utils/logger");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
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
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    logger.info("Getting application by id");

    const { id } = event.queryStringParameters;

    if (!id) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
        },
        body: JSON.stringify({ error: "ID parameter is required" }),
      };
    }

    logger.info(`Fetching application with id: ${id}`);
    const doc = await db.collection("creditApplications").doc(id).get();

    if (!doc.exists) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
        },
        body: JSON.stringify({ error: "Application not found" }),
      };
    }

    logger.info(`Application found with id: ${id}`);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
      body: JSON.stringify({ id: doc.id, ...doc.data() }),
    };
  } catch (error) {
    logger.error(`Error getting the application: ${error}`);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
      body: JSON.stringify({ error: "Error getting the application" }),
    };
  }
};

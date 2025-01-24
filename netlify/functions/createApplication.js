const db = require("../../firebase-config/firebase");
const logger = require("../../utils/logger");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { email, idNumber } = JSON.parse(event.body);

    const existingApplications = await db
      .collection("creditApplications")
      .where("email", "==", email)
      .get();

    if (!existingApplications.empty) {
      logger.warn(`Duplicated email: ${email}`);
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "There's an application with this email",
        }),
      };
    }

    const existingByIdNumber = await db
      .collection("creditApplications")
      .where("idNumber", "==", idNumber)
      .get();

    if (!existingByIdNumber.empty) {
      logger.warn(`Duplicated ID: ${idNumber}`);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "There's an application with this ID" }),
      };
    }

    logger.info("Creating a new application");
    const data = JSON.parse(event.body);
    const docRef = await db.collection("creditApplications").add({
      ...data,
      createdAt: new Date().toISOString(),
    });
    logger.info(`Application created with id: ${docRef.id}`);
    return {
      statusCode: 201,
      body: JSON.stringify({
        id: docRef.id,
        message: "Application created successfully",
      }),
    };
  } catch (error) {
    logger.error(`Error creating the application: ${error}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error creating the application" }),
    };
  }
};

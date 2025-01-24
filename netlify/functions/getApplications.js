const db = require("../../firebase-config/firebase");
const logger = require("../../utils/logger");

exports.handler = async () => {
  try {
    logger.info("Starting getApplications function...");
    logger.info("Fetching data from Firestore collection: creditApplications");

    const snapshot = await db.collection("creditApplications").get();

    if (snapshot.empty) {
      logger.warn("No applications found in the Firestore collection.");
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }

    logger.info(`Applications retrieved: ${snapshot.docs.length}`);

    const applications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(applications),
    };
  } catch (error) {
    logger.error(`Error getting the applications: ${error}`);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error getting the applications" }),
    };
  }
};

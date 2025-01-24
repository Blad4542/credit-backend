const db = require("../../firebase-config/firebase");
const logger = require("../../utils/logger");

exports.handler = async () => {
  try {
    logger.info("Getting all applications");
    const snapshot = await db.collection("creditApplications").get();
    const applications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    logger.info(`Applications found: ${applications.length}`);
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

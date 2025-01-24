const db = require("../../firebase-config/firebase");
const logger = require("../../utils/logger");

exports.handler = async () => {
  try {
    logger.info("Starting getApplications function...");
    console.log("Starting getApplications function...");

    logger.info("Fetching data from Firestore collection: creditApplications");
    console.log(
      "Attempting to fetch data from Firestore collection: creditApplications"
    );

    const snapshot = await db.collection("creditApplications").get();

    console.log("Firestore snapshot obtained:", snapshot);

    // Check if there are documents in the snapshot
    if (snapshot.empty) {
      logger.warn("No applications found in the Firestore collection.");
      console.log("No applications found in the Firestore collection.");
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }

    logger.info(`Applications retrieved: ${snapshot.docs.length}`);
    console.log(`Applications retrieved: ${snapshot.docs.length}`);

    const applications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Mapped applications:", applications);

    return {
      statusCode: 200,
      body: JSON.stringify(applications),
    };
  } catch (error) {
    logger.error(`Error getting the applications: ${error}`);
    console.error("Error getting the applications:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error getting the applications" }),
    };
  }
};

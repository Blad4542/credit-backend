const db = require("../firebase-config/firebase");
const logger = require("../utils/logger");

async function createApplication(req, res) {
  try {
    const { email, idNumber } = req.body;

    const existingApplications = await db
      .collection("creditApplications")
      .where("email", "==", email)
      .get();

    if (!existingApplications.empty) {
      logger.warn(`Duplicaded email: ${email}`);
      return res
        .status(400)
        .json({ error: "There's an application with this email" });
    }

    const existingByIdNumber = await db
      .collection("creditApplications")
      .where("idNumber", "==", idNumber)
      .get();

    if (!existingByIdNumber.empty) {
      logger.warn(`Duplicated ID: ${idNumber}`);
      return res.status(400).json({
        error: "There's an application with this ID",
      });
    }

    logger.info("Creating a new application");
    const data = req.body;
    const docRef = await db.collection("creditApplications").add({
      ...data,
      createdAt: new Date().toISOString(),
    });
    logger.info(`Application created with id: ${docRef.id}`);
    res
      .status(201)
      .json({ id: docRef.id, message: "Application created successfully" });
  } catch (error) {
    logger.error(`Error creating the application: ${error}`);
    res.status(500).json({ error: "Error creating the application" });
  }
}

async function getApplications(req, res) {
  try {
    logger.info("Getting all applications");
    const snapshot = await db.collection("creditApplications").get();
    const applications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    logger.info(`Applications found: ${applications.length}`);
    res.status(200).json(applications);
  } catch (error) {
    logger.error(`Error getting the application: ${error}`);
    res.status(500).json({ error: "Error getting the application" });
  }
}

async function getApplicationById(req, res) {
  try {
    logger.info("Getting application by id");
    const { id } = req.params;
    const doc = await db.collection("creditApplications").doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Solicitud no encontrada" });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la solicitud" });
  }
}

module.exports = { createApplication, getApplications, getApplicationById };

const express = require("express");
const {
  createApplication,
  getApplications,
  getApplicationById,
} = require("../controllers/applications");

const router = express.Router();

router.post("/", createApplication);

router.get("/", getApplications);

router.get("/:id", getApplicationById);

module.exports = router;

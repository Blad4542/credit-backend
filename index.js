const fs = require("fs");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const applicationRoutes = require("./routes/applications");
const logger = require("./utils/logger");

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(cors());
app.use(helmet());
app.use((err, req, res, next) => {
  if (err) {
    logger.warn(`Error detected: ${err.message} in ${req.method} ${req.url}`);
    res.status(400).json({ error: "Invalid request" });
  } else {
    next();
  }
});
app.use("/api/applications", applicationRoutes);

const httpsOptions = {
  key: fs.readFileSync("./localhost-key.pem"),
  cert: fs.readFileSync("./localhost.pem"),
};

const PORT = process.env.PORT || 3000;

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


//Handles ES modules __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logMiddleware = (req,res,next) => {
  const now = new Date();

  // Format: YYYY-MM-DD
  const date = now.toISOString().split("T")[0];

  // Ensure logs directory exists
  const logDir = path.join(__dirname, "../logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  // Daily log file name (e.g., request-2025-09-03.log)
  const logFile = path.join(logDir, `request-${date}.log`);

  // Wait until response finishes, then log details
  res.on("finish", () => {
    const log = `[${now.toISOString()}] ${req.method} ${req.url} - ${
      res.statusCode
    }\n`;

    fs.appendFile(logFile, log, (err) => {
      if (err) console.error("Failed to log a request", err);
    });
  });

  next();
}

export default logMiddleware;

const fs = require("fs");

// Create a readable stream
const readableStream = fs.createReadStream("./day-4/Bigfile.pdf", { encoding: "utf8" });

// Handle events
readableStream.on("data", (chunk) => {
  console.log("Received chunk:", chunk);
});

readableStream.on("end", () => {
  console.log("File reading completed");
});

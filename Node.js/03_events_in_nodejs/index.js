/*
    Create a Program using Node.js EventEmitter that:
    1.Listens for mulitple types of user events (eg. login, logout,purchase, update profile )

    2.tracks how many times each event is emitted

    3. Logs a summary of all events occurrances when a special summary event is triggered
*/





const EventEmitter = require("events");
const userEmitter = new EventEmitter();
const fs = require("fs");

const FILE = "summary.json";

// Load previous counts from file (if exists)
let eventCounts = { login: 0, logout: 0, purchase: 0, update: 0 };

if (fs.existsSync(FILE)) {
  try {
    const data = fs.readFileSync(FILE, "utf-8");
    eventCounts = JSON.parse(data);
  } catch (err) {
    console.log("Error reading summary file, starting fresh...");
  }
}

userEmitter.on("login", (username) => {
  console.log(`${username} logged in successfully`);
  eventCounts.login++;
});

userEmitter.on("logout", (username) => {
  console.log(`${username} logged out successfully`);
  eventCounts.logout++;
});

userEmitter.on("purchase", (username, item) => {
  console.log(`${username} purchased ${item}`);
  eventCounts.purchase++;
});

userEmitter.on("profile_update", (username, field) => {
  console.log(`${username} updated their profile field: ${field}`);
  eventCounts.update++;
});

userEmitter.on("summary", () => {
  fs.writeFile(FILE, JSON.stringify(eventCounts, null, 2), (err) => {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Summary updated in summary.json");

      console.log("\nEvent Summary:");
      console.table(eventCounts);
    }
  });
});

// Emit events
userEmitter.emit("login", "Nitai");
userEmitter.emit("logout", "Nitai");
userEmitter.emit("purchase", "Nitai", "Book");
userEmitter.emit("profile_update", "Nitai", "bio");

// Trigger summary
userEmitter.emit("summary");

const os = require("os");

console.log("System Info:");
console.log("OS:", os.type(), os.release());
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log(os.release());
console.log("Hostname:", os.hostname());
console.log("Uptime (mins):", os.uptime() / 60);
console.log("Total Memory (MB):", os.totalmem() / (1024 * 1024));
console.log("Free Memory (MB):", os.freemem() / (1024 * 1024));
console.log(os.networkInterfaces());

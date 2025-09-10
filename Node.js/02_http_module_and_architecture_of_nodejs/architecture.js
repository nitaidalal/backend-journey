
process.env.UV_THREADPOOL_SIZE = 5

const crypto = require("crypto");
let start = Date.now();
crypto.pbkdf2("password-1","slat1",100000,1024,"sha512",() => {
    console.log(`${Date.now() - start}ms done`)
})

crypto.pbkdf2("password-1", "slat1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms done`);
});

crypto.pbkdf2("password-1", "slat1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms done`);
});

crypto.pbkdf2("password-1", "slat1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms done`);
});

crypto.pbkdf2("password-1", "slat1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms done`);
});




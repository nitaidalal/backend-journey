const http = require("http");

// const server = http.createServer((req,res) => {
//     res.writeHead(200,{"content-type":"text/plain"});
//     res.end("hello from http module");
// })

// server.listen(3000,() => {
//     console.log("server running at http://localhost:3000/");
// });


//🔹 Handling Routes

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Home Page</h1>");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>About Page</h1>");
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Page Not Found</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});

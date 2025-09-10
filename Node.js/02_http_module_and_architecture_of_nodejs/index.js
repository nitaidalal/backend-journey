const http = require("http");
const fs = require("fs");

const PORT = 8080;
const myServer =  http.createServer((req,res) => {
    // res.end("Hello from server");
    const log = `${Date.now()}: From ${req.url}New request received\n`;
    fs.appendFile("log.txt",log,(err) => {
        if(err){
            console.log("Error writing to the log file:",err);
            res.statusCode = 500;
            res.end("Internal server error");
            return;
        }

        res.end("Hwllo from server");

    })
})

myServer.listen(PORT,() => {
    console.log(`server is runnig on ${PORT}`)
})
const http = require("http");
const fs = require("fs");
const {Transform} = require("stream")
const server = http.createServer((req,res) => {
  //1.1: Downloading file in a bad way
    // const file = fs.readFileSync("./day-4/sample.pdf");
    // res.end(file);
  //1.2: Downloading file in a good way
    // const readableStream = fs.createReadStream("./day-4/sample.pdf");
    // readableStream.pipe(res);

  //2.1: Copy file in a bad way
    // const file = fs.readFileSync("./day-4/sample.pdf");
    // fs.writeFileSync("copy.pdf",file);
    // res.end();

  //2.2: Copy file in a good way
    // const readStream = fs.createReadStream("./day-4/sample.pdf");
    // const writeStream = fs.createWriteStream("./day-4/output.pdf");
    // readStream.on("data",(chunk) => {
    //   console.log("Chunk:",chunk)
    //   writeStream.write(chunk);
    // })

  //3.1: String Processing
    const readStream = fs.createReadStream("./day-4/nitai.txt");
    const writeStream = fs.createWriteStream("./day-4/nitai-copy.txt");

    //bad approach
      // readStream.on("data",(chunk)=>{
      //   const modifiedWord = chunk.toString().toUpperCase().replaceAll(/nitai/gi,"coder");
      //   writeStream.write(modifiedWord);
      // })
      // res.end();

  // 3.1: right approach
  const transformStream = new Transform({
    transform(chunk,encoding,callback){
        const modifiedWord = chunk.toString().toUpperCase().replaceAll(/nitai/gi,"coder");
        callback(null,modifiedWord);
    }
  })
  readStream.pipe(transformStream).pipe(writeStream);

  res.end();
})



server.listen(3000,()=>{
    console.log("server is running at http://localhost:3000")
})
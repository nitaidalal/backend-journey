const fs = require("fs");

//write
fs.writeFileSync("./text.txt","This is a sync code");

fs.writeFile("./test.txt","This is a async code", (err) => {
    console.log(err);
})

//read
const res = fs.readFileSync("./text.txt","utf-8")
console.log(res);
fs.readFile("./test.txt","utf-8",(err,res) => {
    if(err){
        console.log(err);
    }else{
        console.log(res)
    }
})


//update/append
fs.appendFileSync("./text.txt", new Date().toDateString())

fs.appendFile("./log.txt",`this is created on ${new Date().toDateString()}\n`,
(err,res) => {
    if(err){
        console.log(err)
    }else{
        console.log(res)
    }
})

//delete
try{
    fs.unlinkSync("./nitai.txt");
    console.log("file deleted successfully");
} catch(err){
    console.error("Error: ",err);
}

fs.unlink("./hello.txt",
    (err) => {
        if(err){
            console.log(err);
        }else{
            console.log("deleted successsfully");
        }
    }
)


//Create folder
fs.mkdirSync("parent/child/grandchild", { recursive: true });
console.log("Nested folders created successfully");


//Get info about file/folder
const stats = fs.statSync("text.txt");
console.log("Is file:", stats.isFile());
console.log("Is directory:", stats.isDirectory());
console.log("Size:", stats.size, "bytes");


//Copy file synchronously
fs.cpSync("source.txt", "copy.txt");
console.log("File copied successfully");




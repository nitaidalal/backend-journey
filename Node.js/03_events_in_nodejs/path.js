const { dir } = require("console");
const path = require("path");f

console.log("Filename:",__filename)
console.log("directory:",__dirname)


// folder/students/data.txt
const filepath = path.join("folder","students","data.txt")
console.log(filepath)

const parsedDataPath = path.parse(filepath)
const resolvedPath = path.resolve(filepath)
const extensionName = path.extname(filepath)
const basename = path.basename(filepath)
const dirname = path.dirname(filepath)

console.log({
    parsedDataPath,
    resolvedPath,
    extensionName,
    basename,
    dirname
})


const file = path.join(__dirname, "data", "info.txt");
console.log(file);
// __dirname ensures it's relative to the current file's directory

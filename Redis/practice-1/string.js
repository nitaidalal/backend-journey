const client = require('./client.js');

async function init(){
    const data = await client.get("name:2");
    console.log(data)
}

init()
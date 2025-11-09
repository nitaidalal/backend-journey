const client = require('./client.js');

async function init(){
    const user = {
        id:1,
        name:"nitai",
        age:21
    }

    await client.set("user:1", JSON.stringify(user));
    console.log("user stored in redis");

    const data = await client.get("user:1");
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    console.log("user retrieved from redis");

}

init()
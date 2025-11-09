const express = require("express");
const redis = require("./client")
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
    const cachedData = await redis.get("todoList");
    if(cachedData){
        return res.json(JSON.parse(cachedData));
    }

    const {data} = await axios.get("https://jsonplaceholder.typicode.com/todos");
    await redis.set("todoList", JSON.stringify(data));
    await redis.expire("todoList", 10); // expire in 10 seconds
    res.json(data);


})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
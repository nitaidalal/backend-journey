import express from 'express';
import data from './data/data.js';
const app = express();
app.use(express.json());
const PORT = 8080;

//1.GET Request 

app.get("/",(req,res) => {
    try {
        res.status(200).send("Hello from server");
    } catch (error) {
        console.log(error);
    }
})

app.get ("/api/v1/users",(req,res) => {
  //query params
  const { age } = req.query;
  if (age) {
    const user = data.filter((user) => {
      return user.age === Number(age);
    });
    return res.status(200).json(user);
  }
  res.status(200).send(data);
})

//router params
app.get("/api/v1/users/:id",(req,res) => {
    const {id} = req.params;
    const specificUser = data.find((user) => user.id === Number(id));
    return res.status(200).json(specificUser);
})

//2. Post requests
 app.post("/api/v1/users",(req,res) => {
    const {name , age} = req.body;
    const newUser = {
        id:data.length+1,
        name,
        age
    }
    data.push(newUser)
    res.status(201).send({
        message:"user created successfully",
        user:newUser
    });
    
 })

 //3. PUT Request (update all fields)
 app.put("/api/v1/users/:id", (req, res) => {
   const {
     body,
     params: { id },
   } = req;

   const parsedId = parseInt(id);
   const useridx = data.findIndex((user) => user.id === parsedId);
   if (useridx === -1) {
     res.status(401).send("user not found");
   }
   data[useridx] = {
     id: parsedId,
     ...body,
   };
   res.status(201).send({
     message: "user updated",
     user: data[useridx],
   });
 });


 //4. patch
 app.patch("/api/v1/users/:id",(req,res) => {

    const user_index = data.findIndex((user) => user.id === Number(req.params.id));
    if (user_index === -1) {
      res.status(401).send("user not found");
    }

    data[user_index] = {
        ...data[user_index],...req.body
    }
    res.status(201).send({
        message:"user updated",
        user:data[user_index]
    })
 })

 // 5. DELETE Request
 let users = [...data];
 app.delete("/api/v1/users/:id", (req,res) => {
    const useridx = users.findIndex(
      (user) => user.id === Number(req.params.id)
    );
    if (useridx === -1) {
      res.status(401).send("user not found");
    }

    const deletedUser = users[useridx];

     users = users.filter((user) => user.id !== Number(req.params.id));
    
    res.send({
        message:"'user has been deleted",
        past_user:deletedUser,
        remaining_users:users
    })
 })





app.listen(PORT,(req,res) => {
    console.log(`server listening at ${PORT}`)
})
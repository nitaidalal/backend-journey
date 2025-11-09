import { Router } from "express";

const userRouter = Router();

userRouter.get("/user-id", (req, res) => {
  res.send("got the user id");
});

userRouter.get("/user-details",(req,res) => {
    res.send("user details ")
})

export default userRouter;
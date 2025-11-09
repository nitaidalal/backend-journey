import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';;
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const  user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({message:"Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/register', async (req, res) => {
    const {username,password} = req.body;

    if(!username || !password){
        return res.status(400).json({message:"Username and password are required"});
    }
    try {
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message:"Username already exists"});
        }
        const newUser = new User({username,password})
        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
});



export default router;
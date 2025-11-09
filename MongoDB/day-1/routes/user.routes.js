import express from 'express';

const router = express.Router();
import User from '../models/user.model.js';

// CRUD

// 1.create
router.post("/users",async(req,res) => {
try {
    const {name,age} = req.body;
    const newUser = new User({name,age}); 
    await newUser.save();
    res.status(201).json({
        success:true,
        message:"User created successfully",
        data:newUser
    })
} catch (error) {
    res.status(500).json({
        success:false,
        message: error.message
    })
}
})

// 2. read
router.get("/users",async(req,res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success:true,
            message:"Users fetched successfully",
            data:users
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
});

//3. update
router.put("/users/:id",async(req,res) => {
    try {
        const {id} = req.params;
        const {name,age} = req.body;
        const updatedUser = await User.findByIdAndUpdate(id,{name,age},{new:true, runValidators:true});
        if(!updatedUser){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"User updated successfully",  
            data:updatedUser
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
})

//4. delete
router.delete("/users/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          return res.status(404).json({
            success: false,
            message: "user not found",
          });
        }
        res.status(201).json({
          success: true,
          message: "user deleted successfully",
          deleted_user_details: deletedUser,
        });
    } catch (error) {
         res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }

})

export default router;
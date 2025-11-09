import { loginUser, registerUser } from "../services/user.service.js";

export const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await registerUser(username, password);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};

export const login = async(req, res) => {
    const {username,password} = req.body;
    // Logic for user login will go here
    try {
       const user = await loginUser(username,password);
       req.session.userId = user._id;
       res.status(200).json({
        success:true,
        message:"User logged in successfully",
        data:user
       });
       if(!user){
        return res.status(401).json({
            success:false,
            message:"Invalid credentials"
        });
       } 

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"User login failed",
            error:error.message
        });
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if(err){
            return res.status(500).json({
                success:false,
                message:"Logout failed",
                error:err.message
            })
        }
        res.status(200).json({
            success:true,
            message:"Logout successful"
        });
    })
};

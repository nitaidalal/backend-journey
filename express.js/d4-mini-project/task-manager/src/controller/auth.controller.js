export const login = (req, res) => {
    const {username} = req.body;
    if(!username){
        return res.status(400).json({message:"username is required"});

    }
    req.session.user = {username};
    res.cookie("username",username,{httpOnly:true,secure:false,maxAge:24*60*60*1000})
    res.json({message:"Login Successful"});
};

export const logout = (req, res) => {
    res.clearCookie("username");
    req.session.destroy((err) => {
        if(err){
            return res.status(500).json({message:"Logout failed"});
        }
        res.json({message:"Logout Successful"});
    });
};
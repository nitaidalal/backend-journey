import mongoose from "mongoose";


const MONGO_URI = "mongodb://127.0.0.1:27017/task_manager";
const connectDB = async() => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDb connected successfully");
    } catch (error) {
        console.log("Error in connecting mongodb: ",error)
    }
}


export default connectDB;
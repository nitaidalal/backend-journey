import {Task} from "../models/task.model.js";

export const createTask = async({title,description,userId}) => {
    const newTask = new Task({
        userId,
        title,
        description
    });
   return await newTask.save();
} 



export const getTasks = async(userId) => {
    return await Task.find({userId});
}       
    

export const getTaskUsingId = async (id) => {
  return await Task.findById(id);
};


export const updateTask = async (id,updateData) => {
    return await Task.findByIdAndUpdate(id,updateData,{new:true});
}

export const deleteTask = async(id) => {
    return await Task.findByIdAndDelete(id);
}
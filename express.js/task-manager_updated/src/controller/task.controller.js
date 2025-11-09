import Task from "../models/task.model.js";
import mongoose from "mongoose";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      res.status(404).json({
        success: false,
        message: "No tasks exist",
      });
    }
    res.status(200).json({
        success:true,
        message:"tasks are fetched successfully",
        Tasks:tasks
    })

  } catch (error) {
    res.status(500).json({
        success:false,
        message:"Internal server error"
    })
  }
};
const createTask = async (req, res) => {
    try {
        const {title,description} = req.body;
        if (!title?.trim() || !description?.trim()) {
          return res.status(400).json({
            success: false,
            message: "title and description are required",
          });
        }
        const newTask = await Task.create({
            title,
            description
        });
        res.status(201).json({
            success:true,
            message:"Task created successfully",
            Task:newTask
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
};




const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
          success: false,
          message: "Please enter a valid id to update any tasks",
        });
      }

      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, description },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        Task: updatedTask,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
};
const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Please provide id to delete the task"
            })
        }
        const deletedTask = await Task.findByIdAndDelete(id);
        if(!deletedTask){
            return res.status(404).json({
                success:false,
                message:"Task not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Task deleted successfully",
            Task:deletedTask
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
  
};

export { getAllTasks, createTask, updateTask, deleteTask };

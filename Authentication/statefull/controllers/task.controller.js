import { createTask, deleteTask, getTasks, getTaskUsingId, updateTask } from "../services/task.service.js";


export const addTask = async(req, res) => {
    const {title,description} = req.body;
    try {
        const newTask = await createTask({title,description,userId: req.session.userId});
        res.status(201).json({
            message: "Task created successfully",
            task: newTask
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error creating task",
            error: error.message
        });
    }
}

export const getAllTasks = async(req, res) => {
    try {
        const tasks = await getTasks(req.session.userId);
        if(!tasks || tasks.length === 0){
            return res.status(404).json({
                message: "No tasks found"
            });
        }
        res.status(200).json({
            message: "Tasks retrieved successfully",
            tasks
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving tasks",
            error: error.message
        });
    }
}

export const getTaskById = async(req, res) => {
   const {id} = req.params;
    try {
        const task = await getTaskUsingId(id);
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json({
            message: "Task retrieved successfully",
            task
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving task",
            error: error.message
        });
    }
}


export const updateTaskById = async(req,res) => {
    const {id} = req.params;
    try {
        const updatedTask = await updateTask(id, req.body);
        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating task",
            error: error.message
        });
    }
}

export const deleteTaskById = async(req,res) => {
    const {id} = req.params;
    try {
        const deletedTask = await deleteTask(id);
        if(!deletedTask){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({
            message:"User deleted successfully",
            deleted_task:deletedTask
        })


    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
        })
    }
}



import {readTasks,writeTasks} from "../utils/taskFile.js";


const getAllTasks = async(req,res) => {
    if(!req.session || !req.session.user){
        return res.status(401).json({message:"unauthenticated"})
    }
    const tasks = await readTasks();
    res.json(tasks.filter(task => task.username === req.session.username))
}
const createTask = async(req,res) => {
    const {title,description} = req.body;
    if (!title || !description){
        return res.status(400).json({message:"title and description are required"});
    }
    const tasks = await readTasks();
    const newTask = {
        id:Date.now(),
        username:req.session.username,
        title,
        description,
        completed:false
    }

    tasks.push(newTask);
    
    await writeTasks(tasks);
    res.status(201).json(newTask);
}

const updateTask = async(req,res) => {
    const {id} = req.params;
    const {title,description,completed} = req.body;
    if(!id){
        return res.status(400).json({message:"id is required"});
    }
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(task => task.id === Number(id) && task.username === req.session.username);
    if(taskIndex === -1){
        return res.status(404).json({message:"task not found"});
    }
    const updatedTask = {...tasks[taskIndex], title, description, completed};
    tasks[taskIndex] = updatedTask;
    await writeTasks(tasks);
    res.json(updatedTask);
}
const deleteTask = async(req,res) => {
   const {id} = req.params;
   if(!id){
    return res.status(400).json({message:"id is required"});
   }
   const tasks = await readTasks();
   const taskIndex = tasks.findIndex(task => task.id === Number(id) && task.username === req.session.username);
   if(taskIndex === -1){
    return res.status(404).json({message:"task not found"});
   }
   const [deletedTask] = tasks.splice(taskIndex,1); 
   await writeTasks(tasks);
   res.status(200).json({
    message:"task deleted successfully",
    deletedTask
   });
}


export {getAllTasks,createTask,updateTask,deleteTask};
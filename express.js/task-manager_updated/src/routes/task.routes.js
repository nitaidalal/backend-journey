import { Router } from "express";

import { createTask, deleteTask, getAllTasks, updateTask } from "../controller/task.controller.js";
const router = Router();

router.get("/",  getAllTasks);
router.post("/",  createTask);
router.put("/:id",  updateTask);
router.delete("/:id",  deleteTask);
export default router;
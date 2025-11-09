import express from "express";
const router = express.Router();
import { addTask , deleteTaskById, getAllTasks, getTaskById, updateTaskById} from "../controllers/task.controller.js";
import { validateSession } from "../middlewares/session.middleware.js";

// Task routes
router.post("/",validateSession, addTask);

router.get("/", validateSession, getAllTasks);

router.get("/:id", validateSession, getTaskById);

router.put("/:id", validateSession, updateTaskById);

router.delete("/:id", validateSession, deleteTaskById);

export default router;
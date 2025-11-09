import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tasksFilePath = path.join(__dirname, 'data', 'tasks.json');

const readTasks = () => {
    try {
        ensureFileExists();
        const data = fs.readFileSync(tasksFilePath, 'utf-8');
        return JSON.parse(data || "[]");
    } catch (error) {
        console.error("Error reading tasks from file:", error);
    }
}

const writeTasks = (tasks) => {
    try {
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error writing tasks to file:", error);
    }
}

const ensureFileExists = () => {
    try {
        if (!fs.existsSync(tasksFilePath)) {
            fs.mkdirSync(path.dirname(tasksFilePath), { recursive: true });
            fs.writeFileSync(tasksFilePath, "[]", 'utf-8');
        }
    } catch (error) {
        console.error("Error ensuring tasks file exists:", error);
    }
}

export { readTasks, writeTasks };

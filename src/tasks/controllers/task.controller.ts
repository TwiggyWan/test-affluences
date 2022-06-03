import { TaskService } from '../services/task.service';
import { Response, Request } from 'express';
import { TaskParams } from '../models/task-params.model';
import { TaskUpsert } from '../models/task-upsert.model';
import { StatusCodes } from 'http-status-codes';

export class TaskController {
    constructor(private taskService: TaskService) {}

    async getTasks(req: Request, res: Response): Promise<void> {
        const tasks = await this.taskService.getAllTasks();
        res.json(tasks);
    }

    async getTask(req: Request, res: Response): Promise<void> {
        const task = await this.taskService.getTaskById(TaskParams.fromParams(req.params));
        res.json(task);
    }

    async createTask(req: Request, res: Response): Promise<void> {
        const task = await this.taskService.createTask(TaskUpsert.fromBody(req.body));
        res.status(StatusCodes.CREATED).json(task);
    }

    async updateTask(req: Request, res: Response): Promise<void> {
        const task = await this.taskService.updateTask(TaskParams.fromParams(req.params), TaskUpsert.fromBody(req.body));
        res.json(task);
    }

    async deleteTask(req: Request, res: Response): Promise<void> {
        await this.taskService.deleteTask(TaskParams.fromParams(req.params));
        res.status(StatusCodes.NO_CONTENT).send();
    }
}

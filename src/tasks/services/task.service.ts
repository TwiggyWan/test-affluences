import { TaskRepository } from '../repositories/task.repository';
import { Task } from '../models/task.model';
import { TaskUpsert } from '../models/task-upsert.model';
import { TaskParams } from '../models/task-params.model';
import { NotFoundError } from '../../core/errors/not-found.error';

export class TaskService {
    constructor(private taskRepository: TaskRepository) {}

    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.getAll();
    }

    async getTaskById(params: TaskParams): Promise<Task> {
        const task = await this.taskRepository.getById(params.taskId);
        if (task === undefined || task === null) throw new NotFoundError(`Task ${params.taskId} not found`);
        return task;
    }

    async createTask(task: TaskUpsert): Promise<Task> {
        return await this.taskRepository.create(task);
    }

    async updateTask(params: TaskParams, task: TaskUpsert): Promise<Task> {
        const updateTask = await this.taskRepository.update(params.taskId, task);
        if (!updateTask) throw new NotFoundError(`Task ${params.taskId} not found`);
        return updateTask;
    }

    async deleteTask(params: TaskParams): Promise<void> {
        const deletedTask = await this.taskRepository.getById(params.taskId);
        if (!deletedTask) throw new NotFoundError(`Task ${params.taskId} not found`);
        await this.taskRepository.delete(params.taskId);
    }
}

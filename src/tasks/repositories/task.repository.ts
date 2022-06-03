import { Task } from '../models/task.model';

export class TaskRepository {
    private readonly tasks: Task[] = [];

    private lastId: number = 0;

    public async getAll(): Promise<Task[]> {
        return this.tasks;
    }

    public async getById(id: number): Promise<Task | undefined> {
        return this.tasks.find((task) => task.taskId === id);
    }

    public async create(task: Omit<Task, 'taskId'>): Promise<Task> {
        const newTask = { ...task, taskId: ++this.lastId };
        this.tasks.push(newTask);
        return newTask;
    }

    public async update(taskId: number, task: Omit<Task, 'taskId'>): Promise<Task | undefined> {
        const index = this.tasks.findIndex((t) => t.taskId === taskId);
        if (index === -1) return undefined;
        this.tasks[index] = { ...this.tasks[index], ...task };
        return this.tasks[index];
    }

    public async delete(id: number): Promise<void> {
        const index = this.tasks.findIndex((t) => t.taskId === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }
}

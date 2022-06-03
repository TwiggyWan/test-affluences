import { TaskUpsert } from '../../../src/tasks/models/task-upsert.model';
import { Task } from '../../../src/tasks/models/task.model';

export const getAllTasks: { toCreate: TaskUpsert[]; expected: Task[] } = {
    toCreate: [
        { taskName: 'task1', taskDescription: 'task1 description', taskIsCompleted: false },
        { taskName: 'task2', taskDescription: 'task2 description', taskIsCompleted: true },
        { taskName: 'task3', taskDescription: 'task3 description', taskIsCompleted: false },
    ],
    expected: [
        new Task(1, 'task1', 'task1 description', false),
        new Task(2, 'task2', 'task2 description', true),
        new Task(3, 'task3', 'task3 description', false),
    ]
};

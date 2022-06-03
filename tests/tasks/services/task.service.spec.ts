import { TaskService } from '../../../src/tasks/services/task.service';
import { TaskRepository } from '../../../src/tasks/repositories/task.repository';
import { getAllTasks } from './task.fixture';
import { TaskParams } from '../../../src/tasks/models/task-params.model';
import { NotFoundError } from '../../../src/core/errors/not-found.error';
import { TaskUpsert } from '../../../src/tasks/models/task-upsert.model';
import { BadRequestError } from '../../../src/core/errors/bad-request.error';

describe('TaskService', () => {
    let service: TaskService;
    let repository: TaskRepository;

    beforeEach(() => {
        repository = new TaskRepository();
        service = new TaskService(repository);
    });

    describe('Get all tasks', () => {
        it('Should return all tasks', async () => {
            for (const task of getAllTasks.toCreate) {
                await repository.create(task);
            }
            const tasks = await service.getAllTasks();
            expect(tasks).toEqual(getAllTasks.expected);
        });
    });

    describe('Get one task', () => {
        it('Should return one task', async () => {
            await repository.create(getAllTasks.toCreate[0]);
            const task = await service.getTaskById(new TaskParams(1));
            expect(task).toEqual(getAllTasks.expected[0]);
        });

        it('Should return the second task only', async () => {
            for (const task of getAllTasks.toCreate) {
                await repository.create(task);
            }
            const task = await service.getTaskById(new TaskParams(2));
            expect(task).toEqual(getAllTasks.expected[1]);
        });

        it('Should throw an error if task is not found', async () => {
            await expect(() => service.getTaskById(new TaskParams(1))).rejects.toThrowError(NotFoundError);
        });
    });

    describe('Create task', () => {
        it('Should create a task', async () => {
            const task = await service.createTask(getAllTasks.toCreate[0]);
            expect(task).toEqual(getAllTasks.expected[0]);
        });
    });
    describe('Update task', () => {
        // TODO: Should be fixed
        it('Should update a task', async () => {
            await repository.create(getAllTasks.toCreate[0]);
            const task = await service.updateTask(new TaskParams(1), getAllTasks.toCreate[1]);
            expect(task).toEqual({ ...getAllTasks.expected[1], taskId: 1 });
        });

        it('Should throw an error if task is not found', async () => {
            await expect(() => service.updateTask(new TaskParams(1), getAllTasks.toCreate[1])).rejects.toThrowError(
                NotFoundError
            );
        });
    });

    describe('Delete task', () => {
        // TODO: Should be fixed
        it('Should delete a task', async () => {
            await repository.create(getAllTasks.toCreate[0]);
            await service.deleteTask(new TaskParams(1));
            const tasks = await service.getAllTasks();
            expect(tasks).toEqual([]);
        });

        it('Should throw an error if task is not found', async () => {
            await expect(() => service.deleteTask(new TaskParams(1))).rejects.toThrowError(NotFoundError);
        });
    });

    describe('Validate task model', () => {
        it('Should validate and create a task model', () => {
            const task = TaskUpsert.fromBody({
                taskName: 'taskName',
                taskDescription: 'taskDescription',
                taskIsCompleted: false,
            });
            expect(task).toEqual(new TaskUpsert('taskName', 'taskDescription', false));
        });

        it('Should validate params', () => {
            const task = TaskParams.fromParams({ taskId: 23 });
            expect(task).toEqual(new TaskParams(23));
        });

        it('Should throw an error if task name is missing', () => {
            expect(() => TaskUpsert.fromBody({})).toThrowError(BadRequestError);
            expect(() => TaskUpsert.fromBody({})).toThrowError(new BadRequestError('Task name is required'));
        });

        it('Should throw an error if task name is missing', () => {
            expect(() => TaskUpsert.fromBody({ taskName: 'task1' })).toThrowError(BadRequestError);
            expect(() => TaskUpsert.fromBody({ taskName: 'task1' })).toThrowError(
                new BadRequestError('Task description is required')
            );
        });

        it('Should throw an error if task name is missing', () => {
            expect(() => TaskUpsert.fromBody({ taskName: 'task1', taskDescription: 'description' })).toThrowError(
                BadRequestError
            );
            expect(() => TaskUpsert.fromBody({ taskName: 'task1', taskDescription: 'description' })).toThrowError(
                new BadRequestError('Task is completed is required')
            );
        });

        it('Should throw an error if task id is missing', () => {
            expect(() => TaskParams.fromParams({})).toThrowError(BadRequestError);
            expect(() => TaskParams.fromParams({})).toThrowError(new BadRequestError('Invalid taskId param'));
        });

        // TODO: Should be fixed
        it('Should throw an error if task id is not a number', () => {
            expect(() => TaskParams.fromParams({ taskId: 'NaN' })).toThrowError(BadRequestError);
            expect(() => TaskParams.fromParams({ taskId: 'NaN' })).toThrowError(
                new BadRequestError('Invalid taskId param')
            );
        });
    });
});

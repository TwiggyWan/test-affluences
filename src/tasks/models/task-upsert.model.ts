import { BadRequestError } from '../../core/errors/bad-request.error';

export class TaskUpsert {
    constructor(
        public taskName: string,
        public taskDescription: string,
        public taskIsCompleted: boolean
    ) {}

    static fromBody(body: Partial<TaskUpsert>): TaskUpsert {
        if (!body.taskName || body.taskName.length === 0) throw new BadRequestError('Task name is required');
        if (!body.taskDescription || body.taskDescription.length === 0) throw new BadRequestError('Task description is required');
        if (body.taskIsCompleted === undefined) throw new BadRequestError('Task is completed is required');
        return new TaskUpsert(body.taskName, body.taskDescription, body.taskIsCompleted);
    }
}

import { BadRequestError } from '../../core/errors/bad-request.error';

export class TaskParams {
    constructor(public taskId: number) {}

    static fromParams(params: Record<string, unknown>): TaskParams {
        const taskId = Number(params.taskId);
        if (isNaN(taskId) || taskId < 1) throw new BadRequestError('Invalid taskId param');
        return new TaskParams(taskId);
    }
}

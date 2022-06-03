import { Router } from 'express';
import { TaskController } from './controllers/task.controller';
import { TaskRepository } from './repositories/task.repository';
import { TaskService } from './services/task.service';
import { NotFoundError } from '../core/errors/not-found.error';
import { Response, Request } from 'express';
import { BadRequestError } from '../core/errors/bad-request.error';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const router = Router();
const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

const wrap = (fn: (req: Request, res: Response) => Promise<void>) => async (req: Request, res: Response) => {
    try {
        await fn(req, res);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
        } else if (error instanceof BadRequestError) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
};

router.get(
    '/tasks',
    wrap((req, res) => taskController.getTasks(req, res))
);
router.get(
    '/tasks/:taskId',
    wrap((req, res) => taskController.getTask(req, res))
);
router.post(
    '/tasks',
    wrap((req, res) => taskController.createTask(req, res))
);
router.put(
    '/tasks/:taskId',
    wrap((req, res) => taskController.updateTask(req, res))
);
router.delete(
    '/tasks/:taskId',
    wrap((req, res) => taskController.deleteTask(req, res))
);

export const taskRouter = router;

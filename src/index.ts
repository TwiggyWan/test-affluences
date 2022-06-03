import compression from 'compression';
import express from 'express';
import bodyParser from 'body-parser';
import { taskRouter } from './tasks/task.router';
import { applyMetrics } from './core/metrics.router';

const port = process.env.PORT || 3000;
const app = express();
app.use(compression());
app.use(bodyParser.json());
applyMetrics(app, {
        enableMetrics: process.env.ENABLE_METRICS === 'true',
        promToken: process.env.PROM_TOKEN,
        label: 'todo-list',
        normalizePath: [
            ['/tasks/[0-9]*', '/tasks/#taskId']
        ],
    }
);

app.use('/', taskRouter);

app.listen(port, () => {
    console.log(`A basic todo list API listening on port ${port}`);
});

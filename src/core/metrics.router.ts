import { NextFunction, Request, Response } from 'express';
import promBundle from 'express-prom-bundle';
import { ForbiddenError } from './errors/forbidden.error';

export type MetricsConfig = {
    enableMetrics?: boolean;
    metricsPath?: string;
    promToken?: string;
    label: string;
    normalizePath: [string, string][];
    bypass?: (req: Request) => boolean;
};

export interface AffluRouter<T> {
    use(...args: unknown[]): T;
}


export const applyMetrics = <T extends AffluRouter<T>>(router: T, config: MetricsConfig): T => {
    if (config.promToken === undefined || config.promToken.length < 1 || !config.enableMetrics) return router;

    router.use((req: Request, res: Response, next: NextFunction): void => {
        if (req.path === '/metrics' && req.headers.authorization !== `Bearer ${config.promToken}`) {
            throw new ForbiddenError('error_forbidden');
        }
        next();
    });

    router.use(
        promBundle({
            metricsPath: config.metricsPath ?? '/metrics',
            includeMethod: true,
            includePath: true,
            customLabels: { app: config.label },
            normalizePath: config.normalizePath,
            bypass: config.bypass,
            promClient: {
                collectDefaultMetrics: {
                    labels: { app: config.label },
                },
            },
        })
    );

    return router;
};

import { Request, Response, NextFunction } from 'express';

interface ResponseError extends Error {
    statusCode?: number;
}

const errorHandling = (
    err: ResponseError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err.name === 'CastError') {
        return res.status(400).send({ message: 'malformatted id' });
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    } else if (err.name === 'ECONNRESET') {
        console.log('Client closed connection');
        return res.status(400).json({ message: err.message });
    } else if (err.message === 'User is blocked') {
        return res.status(403).json({ message: err });
    } else {
        console.log('Middleware Error Hadnling');
        const errStatus = err.statusCode || 500;
        const errMsg = err.message || 'Something went wrong';
        return res.status(errStatus).json({
            success: false,
            status: errStatus,
            message: errMsg,
        });
    }
};

const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send({ message: 'unknown endpoint' });
};

export default { errorHandling, unknownEndpoint };

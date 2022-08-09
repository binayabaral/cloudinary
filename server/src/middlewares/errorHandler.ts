import { NextFunction, Request, Response } from 'express';

import CustomError from '../misc/CustomError';

/**
 * Middleware to handle errors
 * @param {CustomError} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

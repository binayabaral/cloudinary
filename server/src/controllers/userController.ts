import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../misc/CustomError';

import * as userService from '../services/userService';

/**
 * Create a new user.
 * @param {Request} req
 * @param {Response} res
 */
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, fileString } = req.body;

  if (!name || !email || !fileString) {
    throw new CustomError('Missing required fields', StatusCodes.BAD_REQUEST);
  }

  userService
    .createUser({ name, email, fileString })
    .then(data => res.json(data))
    .catch(err => next(err));
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  userService
    .getAllUsers()
    .then(data => res.json(data))
    .catch(err => next(err));
};

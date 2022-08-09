// import logger from '../misc/logger';
import Success from '../domain/Success';
import UserModel from '../models/UserModel';
import User, { CreateUserPayload } from '../domain/User';
import logger from '../misc/logger';
import cloudinary from '../utils/cloudinary';
import CustomError from '../misc/CustomError';
import { StatusCodes } from 'http-status-codes';

/**
 * Create a new User.
 * @param {UserToInsert} user
 * @returns {Promise<Success<User>>}
 */
export const createUser = async (payload: CreateUserPayload): Promise<Success<User>> => {
  const { fileString } = payload;

  try {
    logger.info('Uploading image to cloudinary');
    const uploadResponse = await cloudinary.uploader.upload(fileString, {
      upload_preset: 'node-training'
    });
    logger.info('Successfully uploaded image to cloudinary');

    const { url } = uploadResponse;
    const insertedUser = await UserModel.createUser({
      name: payload.name,
      email: payload.email,
      profilePictureURL: url
    });

    return {
      data: insertedUser,
      message: 'User created successfully'
    };
  } catch (error) {
    throw new CustomError(`Error creating a new user`, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const getAllUsers = async (): Promise<Success<User[]>> => {
  const users = await UserModel.getAllUsers();

  return {
    data: users,
    message: 'Users retrieved successfully'
  };
};

import { StatusCodes } from "http-status-codes";
import knex from "../db/knex";
import { UserToInsert } from "../domain/User";
import CustomError from "../misc/CustomError";
import logger from "../misc/logger";

class User {
  public static table = "users";

  public static async createUser(user: UserToInsert) {
    try {
      logger.info(`Inserting user ${user.name} into database`);

      const newUser = await knex(this.table)
        .insert({ name: user.name, email: user.email, profile_pic_url: user.profilePictureURL })
        .returning("*");
      logger.info("User inserted");

      return newUser;
    } catch (error) {
      logger.error(error);
      throw new CustomError(`Error inserting user into database`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public static async getAllUsers() {
    const users = await knex(this.table).select();

    return users;
  }
}

export default User;

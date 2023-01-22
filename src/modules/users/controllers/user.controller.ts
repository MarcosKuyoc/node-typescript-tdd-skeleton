import logger from '../../../adapters/logger/logger';
import { UserService } from '../services/user.service';
import { IUserRequest, IUserResponse } from './user.interfaces';

export class UserController {
  constructor(private userService: UserService) {}

  async find(): Promise<IUserResponse[] | []> {
    return await this.userService.find();
  }

  async create(payload: IUserRequest): Promise<IUserResponse | null> {
    try {
      return await this.userService.create(payload);
    } catch (error) {
      logger.logger.error(`${UserController.name}, create`);
      throw error;
    }
  }
}
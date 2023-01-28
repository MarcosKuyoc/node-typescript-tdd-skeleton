import { Logger } from '../../../adapters/logger';
import { UserService } from '../services/user.service';
import { IUserRequest, IUserResponse } from './user.interfaces';

export class UserController {
  private logger = Logger.getInstance();
  
  constructor(private userService: UserService) {}

  async find(): Promise<IUserResponse[] | []> {
    this.logger.info(`${UserController.name}, find`);
    return await this.userService.find();
  }

  async create(payload: IUserRequest): Promise<IUserResponse | null> {
    try {
      this.logger.info(`${UserController.name}, create`);
      return await this.userService.create(payload);
    } catch (error) {
      this.logger.error(`${UserController.name}, create`);
      throw error;
    }
  }
}
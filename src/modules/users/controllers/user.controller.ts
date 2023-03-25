/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '../../../adapters/logger';
import { UserService } from '../application/services';
import { IUserCreateService } from '../domain/services';
import { IUserRequest, IUserResponse } from './user.interface';

export class UserController {
  private logger = Logger.getInstance();

  constructor(private userService: UserService, private userWithRolesService?: IUserCreateService) {}

  async find(): Promise<IUserResponse[] | []> {
    this.logger.info(`${UserController.name}, find`);
    return await this.userService.find();
  }

  async create(payload: IUserRequest): Promise<IUserResponse | null> {
    try {
      this.logger.info(`${UserController.name}, create`);
      return await this.userWithRolesService!.create(payload);
    } catch (error) {
      this.logger.error(`${UserController.name}, create`);
      throw error;
    }
  }
}
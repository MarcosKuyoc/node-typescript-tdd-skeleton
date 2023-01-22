import logger from '../../../adapters/logger/logger';
import { IUserRequest, IUserResponse } from '../controllers/user.interfaces';
import { CreateUserDto } from '../domain/dto/user.dto';

export class UserService {
  async find(): Promise<IUserResponse[] | []>{
    try {
      return [{
        email: 'marcos.kuyoc.dev@gmail.com',
        password: '12knsdsdu2323',
        role: 'admin'
      }];
    } catch (error) {
      logger.logger.error(`${UserService.name}, find`);
      logger.logger.error(error);
      throw error;
    }
  }

  async create(data: IUserRequest): Promise<IUserResponse | null> {
    try {
      const userDto = new CreateUserDto();
      const isValidUser = await userDto.validate(data);

      if (isValidUser) {
        return {
          email: 'marcos.kuyoc.dev@gmail.com',
          password: '12knsdsdu2323',
          role: 'admin'
        }
      }

      return null;
    } catch (error) {
      logger.logger.error(`${UserService.name}, create`);
      logger.logger.error(`${error}`);
      throw error;
    }
  }
}
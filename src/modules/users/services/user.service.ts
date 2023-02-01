import { Logger } from '../../../adapters/logger';
import { IUserRequest, IUserResponse } from '../controllers/user.interfaces';
import { CreateUserDto } from '../domain/dto/user.dto';

export class UserService {
  private logger = Logger.getInstance();

  async find(): Promise<IUserResponse[] | []>{
    try {
      this.logger.info(`${UserService.name}, find`);
      return [{
        email: 'marcos.kuyoc.dev@gmail.com',
        password: '12knsdsdu2323',
        role: 'admin'
      }];
    } catch (error) {
      this.logger.error(`${UserService.name}, find`);
      this.logger.error(error);
      throw error;
    }
  }

  async create(data: IUserRequest): Promise<IUserResponse | null> {
    try {
      this.logger.info(`${UserService.name}, create`);
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
      this.logger.error(`${UserService.name}, create`);
      throw error;
    }
  }
}
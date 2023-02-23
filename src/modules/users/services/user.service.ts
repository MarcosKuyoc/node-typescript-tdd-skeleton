/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '../../../adapters/logger';
import { encrypt } from '../../../helpers';
import { IUserRequest, IUserResponse } from '../controllers/user.interfaces';
import { CreateUserDto } from '../domain/dto/user.dto';
import { UserRepository } from '../domain/repositories/user.repository.interface';
import { RolService } from './rol.service';

export class UserService {
  private logger = Logger.getInstance();
  
  constructor(private userRepository: UserRepository, private rolService: RolService) {}
  
  async find(): Promise<IUserResponse[] | []>{
    try {
      this.logger.info(`${UserService.name}, find`);
      const result = await this.userRepository.find();
      return result;
    } catch (error) {
      this.logger.error(`${UserService.name}, find`);
      this.logger.error(error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<IUserResponse | null> {
    try {
      const filter = {email};
      const user =  await this.userRepository.findOne(filter);
      return user;
    } catch (error) {
      this.logger.error(`${UserService.name}, find`);
      this.logger.error(error);
      throw error;
    }
  }

  async create(data: IUserRequest): Promise<IUserResponse> {
    try {
      this.logger.info(`${UserService.name}, create`);
      const userDto = new CreateUserDto();
      await userDto.validate(data);
      const password = await encrypt(data.password);

      let payload = {
        email: data.email,
        password
      }

      const hasRoles = Object.prototype.hasOwnProperty.call(data, 'roles');
      let listRoles;
      
      if (hasRoles) {
        listRoles = data.roles!
      } else {
        listRoles = ['basic'];
      }

      const roles = await this.rolService.findValidRoles(listRoles);
      payload = Object.assign(payload , roles);

      const result = await this.userRepository.create(payload);
      return result;
    } catch (error) {
      this.logger.error(`${UserService.name}, create`);
      throw error;
    }
  }
}
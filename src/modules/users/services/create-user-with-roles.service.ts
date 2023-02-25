/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Logger } from '../../../adapters/logger';
import { IUserRequest, IUserResponse } from '../controllers/user.interfaces';
import { IROLES, RolService } from './rol.service';
import { UserService } from './user.service';
import { IUserCreateService } from './user.service.interface';

export class CreateUserWithRolesService implements IUserCreateService {
  private logger = Logger.getInstance();
  
  constructor(private userService: UserService, private rolService: RolService) {}
  
  async create(data: IUserRequest): Promise<IUserResponse> {
    try {
      this.logger.info(`${CreateUserWithRolesService.name}, add`);
  
      const hasRoles = Object.prototype.hasOwnProperty.call(data, 'roles');
      let listRoles;
      
      if (hasRoles) {
        listRoles = data.roles!
      } else {
        listRoles = ['anonymous'];
      }

      const roles: IROLES = await this.rolService.findValidRoles(listRoles);
      const payload = Object.assign(data , roles);

      const result = await this.userService.create(payload);
      return result;
    } catch (error) {
      this.logger.error(`${CreateUserWithRolesService.name}, create`);
      throw error;
    }
  }
}
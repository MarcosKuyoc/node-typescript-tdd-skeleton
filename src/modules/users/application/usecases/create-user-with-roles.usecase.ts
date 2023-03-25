/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Logger } from '../../../../adapters/logger';
import { IUserRequest, IUserResponse } from '../../controllers/user.interface';
import { IROLES, RolService } from '../services/rol.service';
import { UserService } from '../services/user.service';
import { IUserCreateService } from '../../domain/services/user.service.interface';

export class CreateUserWithRolesUseCase implements IUserCreateService {
  private logger = Logger.getInstance();
  
  constructor(private userService: UserService, private rolService: RolService) {}
  
  async create(data: IUserRequest): Promise<IUserResponse> {
    try {
      this.logger.info(`${CreateUserWithRolesUseCase.name}, add`);
  
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
      this.logger.error(`${CreateUserWithRolesUseCase.name}, create`);
      throw error;
    }
  }
}
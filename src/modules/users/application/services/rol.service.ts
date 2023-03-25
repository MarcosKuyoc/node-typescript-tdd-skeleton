/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '../../../../adapters/logger';
import { IAllSettled } from '../../../shared/interfaces';
import { RoleRepository } from '../../domain/repositories/';

export interface IROLES {
  roles: string[]
}

export class RolService {
  private logger = Logger.getInstance();
  
  constructor(private roleRepository: RoleRepository) {}

  async findValidRoles(listRoles: string[]): Promise<IROLES> {
    try {
      const allRoles: any = await Promise.allSettled(
        listRoles.map(async (role: string)=> {
          const result = await this.roleRepository.findOne({name: role});
          if (result) {
            const id = result._id.toString();
            return id;
          }
          const message = `No se encontró el rol ${role}`;
          this.logger.warn(message);
          throw new Error(`${message}`);
        })
      );
      this.logger.info(allRoles);
      const rolesIds = allRoles.filter((item: IAllSettled) => item.status === 'fulfilled').map((id: IAllSettled) => id.value);
      
      if (rolesIds.length === 0) {
        throw new Error('Los roles que está ingresando no son válidos');
      }

      return {
        roles: rolesIds
      }
    } catch (error: any) {
      this.logger.error(`${RolService.name}, findValidRoles`);
      this.logger.error(`${error.message}`);
      throw error;
    }
  }
}
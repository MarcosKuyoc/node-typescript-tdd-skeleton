import { Logger } from '../../../../../adapters/logger';
import { IRoleResponse, IRoleRequest } from '../../../controllers/role.interface';
import { RoleRepository } from '../../../domain/repositories/role.repository.interface';
import Role from '../../models/mongo/role';

export class RoleMongoRepository implements RoleRepository {
  private logger = Logger.getInstance();
  
  async find(filter?: object): Promise<IRoleResponse[] | []> {
    try {
      const where = (filter) ? filter : {};
      const roles = await Role.find(where, {name: 1});

      if (!roles) {
        return [];
      }

      return roles;
    } catch (error) {
      this.logger.error(`${RoleMongoRepository.name}, find`);
      throw error;
    }
  }

  async findOne(filter?: object): Promise<IRoleResponse | null> {
    try {
      const where = (filter) ? filter : {};
      const role = await Role.findOne(where, {name: 1});

      if (!role) {
        return null;
      }

      return role;
    } catch (error) {
      this.logger.error(`${RoleMongoRepository.name}, findOne`);
      throw error;
    }
  }

  async create(data: IRoleRequest): Promise<IRoleResponse | null> {
    try {
      const newRole = new Role({name: data.name});
      const role = await newRole.save();
      return role;
    } catch (error) {
      this.logger.error(`${RoleMongoRepository.name}, create`);
      throw error;
    }
  }
}
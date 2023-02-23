import { IRoleRequest, IRoleResponse } from '../../controllers/role.interface';

export interface RoleRepository {
  find(filter?: object): Promise<IRoleResponse[] | []>;
  findOne(filter?: object): Promise<IRoleResponse | null>;
  create(data: IRoleRequest): Promise<IRoleResponse | null>;
}
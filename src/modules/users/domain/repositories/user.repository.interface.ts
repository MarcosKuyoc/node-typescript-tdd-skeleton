import { IUserRequest, IUserResponse } from '../../controllers/user.interfaces';

export interface UserRepository {
  find(): Promise<IUserResponse[] | []>;
  findOne(query: object): Promise<IUserResponse | null>;
  create(data: IUserRequest): Promise<IUserResponse>;
}
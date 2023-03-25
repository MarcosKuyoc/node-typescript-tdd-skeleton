import { IUserRequest, IUserResponse } from '../../controllers/user.interface';

export interface IUserService {
  find(): Promise<IUserResponse[] | []>;
  findByEmail(email: string): Promise<IUserResponse | null>;
}

export interface IUserCreateService {
  create(data: IUserRequest): Promise<IUserResponse>;
}

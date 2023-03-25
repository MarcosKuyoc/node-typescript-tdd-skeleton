import { IUserResponse } from '../../users/controllers/user.interface';

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  data: IUserResponse;
}

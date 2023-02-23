
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUserRequest {
  email: string;
  password: string;
  roles?: string[];
}

export interface IUserResponse {
  id: string;
  email: string;
  password: string;
  roles: string[] | [];
}
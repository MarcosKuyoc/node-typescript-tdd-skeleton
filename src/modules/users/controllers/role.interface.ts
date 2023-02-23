import { ObjectId } from 'mongoose';

export interface IRoleRequest {
  name: string;
}

export interface IRoleResponse {
  _id: ObjectId;
  name: string;
}
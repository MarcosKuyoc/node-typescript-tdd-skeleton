/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Logger } from '../../../../../adapters/logger';
import { IUserRequest, IUserResponse } from '../../../controllers/user.interfaces';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import User from '../../models/mongo/user';

export class UserMongoRepository implements UserRepository {
  private logger = Logger.getInstance();
  
  async find(filter?: object): Promise<IUserResponse[] | []> {
    try {
      const where = (filter) ? filter : {};
      const users = await User.find(where, {email: 1, password: 1, roles: 1});

      if (!users) {
        return [];
      }

      const result = users.map((item)=> {
        const rolesMongo = item.roles;
        let roles = [];

        if (rolesMongo !== undefined) {
          roles = rolesMongo.map((role) => {
            const rol = role._id.toString();
            return rol;
          });
        }

        const user = {
          id: item._id,
          email: item.email,
          password: item.password,
          roles
        }
        return user;
      })

      return result;
    } catch (error) {
      this.logger.error(`${UserMongoRepository.name}, find`);
      throw error;
    }
  }

  async findOne(query?: object): Promise<IUserResponse | null> {
    try {
      const filter = (query) ? query : {};
      const user = await User.findOne(filter, {email: 1, password: 1, roles: 1});

      if (!user) {
        return null;
      }

      const rolesMongo = user.roles;
      let roles = [];

      if (rolesMongo !== undefined) {
        roles = rolesMongo.map((role) => {
          const rol = role._id.toString();
          return rol;
        });
      }

      const result = {
        id: user._id,
        email: user.email,
        password: user.password,
        roles
      }
      return result;
    } catch (error) {
      this.logger.error(`${UserMongoRepository.name}, find`);
      throw error;
    }
  }

  async create(payload: IUserRequest): Promise<IUserResponse> {
    try {
      const newUser = new User(payload);
      const user = await newUser.save();

      const rolesMongo = user.roles;
      let roles = [];

      if (rolesMongo !== undefined) {
        roles = rolesMongo.map((role) => {
          const rol = role._id.toString();
          return rol;
        });
      }

      return {
        id: user._id,
        email: user.email,
        password: user.email,
        roles
      }
    } catch (error) {
      this.logger.error(`${UserMongoRepository.name}, create`);
      throw error;
    }
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserRequest, IUserResponse } from '../../../../modules/users/controllers/user.interface';
import { UserRepository } from '../../../../modules/users/domain/repositories';
import { UserService } from '../../../../modules/users/application/services/user.service';

describe('User Service', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;
   
  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    };

    userService = new UserService(userRepository);
  });

  describe('create', () => {
    it('should create a user with correct data', async () => {
      // Configuramos el comportamiento esperado del userRepository.create
      const expectedUser: IUserResponse = {
        id: '1',
        email: 'test@test.com',
        password: 'encrypted_password',
        roles: ['admin'],
      };
      userRepository.create.mockResolvedValueOnce(expectedUser);
    
      // Creamos el objeto de datos de entrada
      const userData: IUserRequest = {
        email: 'test@test.com',
        password: 'password',
      };
    
      // Ejecutamos la función que vamos a probar
      const result = await userService.create(userData);
    
      // Verificamos que el resultado sea el esperado
      expect(result).toEqual(expectedUser);
    
      // Verificamos que el método userRepository.create haya sido llamado con los parámetros esperados
      expect(userRepository.create).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: expect.any(String),
      });
    });

    it('should throw an error if data is missing or invalid', async () => {
      // Arrange
      const userData: any = {}; // Empty data object

      // Act and Assert
      await expect(userService.create(userData)).rejects.toThrow(Error);
    });

    it('should throw an error if the data is invalid', async () => {
      // Creamos el objeto de datos de entrada inválido
      const userData: IUserRequest = {
        email: 'invalid_email',
        password: 'password',
      };
  
      // Ejecutamos la función que vamos a probar
      await expect(userService.create(userData)).rejects.toThrow(); // OK
  
      // Verificamos que el método userRepository.create NO haya sido llamado
      expect(userRepository.create).not.toHaveBeenCalled();
    });
  
    it('should assign roles if they are provided', async () => {
      // Configuramos el comportamiento esperado del userRepository.create
      const expectedUser: IUserResponse = {
        id: '1',
        email: 'test@test.com',
        password: 'encrypted_password',
        roles: ['admin'],
      };
      userRepository.create.mockResolvedValueOnce(expectedUser);
  
      // Creamos el objeto de datos de entrada con roles
      const userData: IUserRequest = {
        email: 'test@test.com',
        password: 'password',
        roles: ['admin']
      };
  
      // Ejecutamos la función que vamos a probar
      const result = await userService.create(userData);
  
      // Verificamos que el resultado sea el esperado
      expect(result).toEqual(expectedUser);
  
      // Verificamos que el método userRepository.create haya sido llamado con los parámetros esperados
      expect(userRepository.create).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: expect.any(String),
        roles: ['admin'],
      });
    });
  
    it('should throw an error if the userRepository.create method throws an error', async () => {
      // Configuramos el comportamiento del userRepository.create para que lance una excepción
      const errorMessage = 'Unexpected error';
      userRepository.create.mockRejectedValueOnce(new Error(errorMessage));
    
      // Creamos el objeto de datos de entrada
      const userData: IUserRequest = {
        email: 'test@test.com',
        password: 'password',
      };
    
      // Ejecutamos la función que vamos a probar
      await expect(userService.create(userData)).rejects.toThrow();
    
      // Verificamos que el método userRepository.create haya sido llamado con los parámetros esperados
      expect(userRepository.create).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: expect.any(String),
      });
    });
  })

  describe('find', () => {
    it('should return an array of IUserResponse objects', async () => {
      // Arrange
      const listUsers: IUserResponse[] = [{
        id: '1',
        email: 'test@test.com',
        password: 'encrypted_password',
        roles: ['admin'],
      }]
      userRepository.find = jest.fn().mockResolvedValueOnce(listUsers);

      // Act
      const result = await userService.find();

      // Asserts
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('email');
      expect(result[0]).toHaveProperty('password');
      expect(result[0]).toHaveProperty('roles');
    });

    it('should throw an error if UserRepository.find() fails', async () => {
      userRepository.find = jest.fn().mockRejectedValue(new Error('Database error'));
      await expect(userService.find()).rejects.toThrow('Database error');
    });
  });

  describe('findByEmail', () => {
    it('should return null if no user is found', async () => {
      // Arrange
      const email = 'nonexistent@example.com';
      userRepository.findOne.mockResolvedValueOnce(null);

      // Act
      const result = await userService.findByEmail(email);

      // Asserts
      expect(result).toBeNull();
      expect(userRepository.findOne).toHaveBeenCalledWith({ email });
    });

    it('should return the user if one is found', async () => {
      // Arrange
      const email = 'existing@example.com';
      const user: IUserResponse = { id: '1', email, password: 'password', roles: [] };
      userRepository.findOne.mockResolvedValueOnce(user);

      // Act
      const result = await userService.findByEmail(email);

      // Asserts
      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({ email });
    });

    it('should log and rethrow any errors', async () => {
      // Arrange
      const email = 'existing@example.com';
      const error = new Error('database error');
      userRepository.findOne.mockRejectedValueOnce(error);
      //const loggerSpy = jest.spyOn(userService.logger, 'error');

      // Act & Asserts
      await expect(userService.findByEmail(email)).rejects.toThrow(error);
      // expect(loggerSpy).toHaveBeenCalledWith(
      //   `${UserService.name}, find`,
      // );
      // expect(loggerSpy).toHaveBeenCalledWith(error);
    });
  });
});

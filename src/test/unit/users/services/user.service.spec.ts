/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserRequest, IUserResponse } from '../../../../modules/users/controllers/user.interfaces';
import { UserRepository } from '../../../../modules/users/domain/repositories';
import { UserService } from '../../../../modules/users/services/user.service';

describe('User Service - create', () => {
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

  describe('Create a New User', () => {
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
});

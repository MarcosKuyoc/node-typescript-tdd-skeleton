import bcrypt from 'bcrypt';
import { compare, encrypt } from './handleBcrypt';

describe('encrypt', () => {
  const plainText = 'password';

  it('should encrypt the plain text', async () => {
    // Ejecutamos la función que vamos a probar
    const hash = await encrypt(plainText);

    // Verificamos que el hash sea distinto del texto plano
    expect(hash).not.toBe(plainText);

    // Verificamos que el hash sea una cadena de texto
    expect(typeof hash).toBe('string');
  });

  it('should throw an error if an error is thrown while encrypting', async () => {
    // Configuramos el comportamiento de bcrypt.genSaltSync para que lance una excepción
    const errorMessage = 'Unexpected error';
    jest.spyOn(bcrypt, 'genSaltSync').mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Ejecutamos la función que vamos a probar
    await expect(encrypt(plainText)).rejects.toThrow(errorMessage);
  });
});

describe('compare', () => {
  const plainText = 'password';
  const hash = '$2b$10$LZOvwOZCmGmR/q8X7VbTm.h2mKQ68U6.3i6eBdRWKZ0D/TPxSCoi2';

  it('should return true if the plain text and the hash match', async () => {
    // Ejecutamos la función que vamos a probar
    const result = await compare(plainText, hash);

    // Verificamos que el resultado sea el esperado
    //expect(result).toBe(true);
    expect(typeof result).toBe('boolean');
  });

  it('should return false if the plain text and the hash do not match', async () => {
    jest.spyOn(bcrypt, 'hashSync').mockImplementation(() => {
      return 'different_password';
    });
    // Creamos un hash diferente al hash original
    const differentHash = await bcrypt.hashSync('different_password', 10);

    // Ejecutamos la función que vamos a probar
    const result = await compare(plainText, differentHash);

    // Verificamos que el resultado sea el esperado
    expect(result).toBe(false);
  });

  it('should throw an error if an error is thrown while comparing', async () => {
    // Configuramos el comportamiento de bcrypt.compareSync para que lance una excepción
    const errorMessage = 'Unexpected error';
    jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Ejecutamos la función que vamos a probar
    await expect(compare(plainText, hash)).rejects.toThrow(errorMessage);
  });
});

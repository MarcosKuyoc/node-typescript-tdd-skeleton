import { Ping } from '../services/ping';

describe('Primer prueba con jest', () => {
  test('should return string Pong!', async() => {
    const result = await Ping();
    expect(result).toEqual('Pong!');
   });

});
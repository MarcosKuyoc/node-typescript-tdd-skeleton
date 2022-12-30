import { CheckHealth } from './check-health';

describe('Primer prueba con jest', () => {
  test('should return string CheckHealth Ok!', async() => {
    const result = await CheckHealth();
    expect(result).toEqual('CheckHealth Ok!');
   });

});
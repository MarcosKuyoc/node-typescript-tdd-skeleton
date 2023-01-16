import { CheckHealthService } from './check-health';


describe('Primer prueba con jest', () => {
  test('should return string CheckHealth Ok!', async() => {
    const service = new CheckHealthService();
    const result = await service.find();
    expect(result.info).toEqual('CheckHealth Ok!');
  });
});

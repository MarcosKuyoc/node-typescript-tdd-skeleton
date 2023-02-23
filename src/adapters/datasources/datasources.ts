import { connecMongoDB } from './mongo/connect';

// TODO: crear una fabrica de datasources para poder conectar con otras base de datos.
export class DataSources {
  async init() {
    await connecMongoDB();
  } 
}
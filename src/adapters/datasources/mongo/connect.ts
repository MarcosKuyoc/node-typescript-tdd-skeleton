import mongoose from 'mongoose';
import { MONGO_CONFIG } from '../../../config';
import { Logger } from '../../logger';
const logger = Logger.getInstance();

export const connecMongoDB = async() => {
  try {
    mongoose.set('strictQuery', false);
    const db = await mongoose.connect(`mongodb://${MONGO_CONFIG.host}/${MONGO_CONFIG.db}`);
    logger.info(`Database is connected to ${db.connection.db.databaseName}`);
  } catch (error) {
    logger.warn('Database is not connected');
  }
}
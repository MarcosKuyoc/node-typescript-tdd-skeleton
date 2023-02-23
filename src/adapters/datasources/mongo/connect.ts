import mongoose from 'mongoose';
import { MONGO_URL } from '../../../config';
import { Logger } from '../../logger';
const logger = Logger.getInstance();

export const connecMongoDB = async() => {
  try {
    mongoose.set('strictQuery', false);
    const db = await mongoose.connect(MONGO_URL);
    logger.info(`Database is connected to ${db.connection.db.databaseName}`);
  } catch (error) {
    logger.warn('Database is not connected');
  }
}
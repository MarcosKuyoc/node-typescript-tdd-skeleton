import mongoose from 'mongoose';
import { MONGO_CONFIG } from '../../../config';
import { logger } from '../../logger/logger';

export const connecMongoDB = async() => {
  mongoose.set('strictQuery', false);
  const db = await mongoose.connect(`mongodb://${MONGO_CONFIG.host}/${MONGO_CONFIG.db}`);
  logger.logger.info(`Database is connected to ${db.connection.db.databaseName}`);
}
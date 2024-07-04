import dotenv from "dotenv";
import { Db, MongoClient, ServerApiVersion } from "mongodb";
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb+srv://maxasselin:NxdYqZaI8MawY3sb@autoquad1.mrlwjo4.mongodb.net/?retryWrites=true&w=majority';
const databaseName = 'kumonjin';

if (!uri) {
    throw new Error('MongoDB URI is required');
}

export const connectToDatabase = async () => {
    try {
      await mongoose.connect(uri, {});
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      throw error;
    }
  };

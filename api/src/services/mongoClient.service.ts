import dotenv from "dotenv";
import { Db, MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb+srv://maxasselin:NxdYqZaI8MawY3sb@autoquad1.mrlwjo4.mongodb.net/?retryWrites=true&w=majority';
const databaseName = 'kumonjin';

if (!uri) {
    throw new Error('MongoDB URI is required');
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db: Db;

export const connectToDatabase = async () => {
    try {
        await client.connect();
        db = client.db(databaseName);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
};

export const getDb = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return db;
};

export const mongoClient = {
    client: async (callback: (arg0: Db) => any) => {
        try {
            return await callback(db);
        } catch (e) {
            console.error(e);
        }
    }
};
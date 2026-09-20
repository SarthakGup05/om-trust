import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('[Database] Error: MONGODB_URI is not defined in environment variables.');
    throw new Error('MONGODB_URI environment variable is missing.');
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[Database] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error('[Database] Connection failed:', error instanceof Error ? error.message : error);
    throw error;
  }
};

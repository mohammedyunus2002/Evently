import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { con: null, promise: null };

export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn

    if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'evently',
        bufferCommands: false
    }).then(mongoose => {
        console.log('Connected to MongoDB');
        return mongoose;
    });

    cached.conn = await cached.promise;

    return cached.conn;
}
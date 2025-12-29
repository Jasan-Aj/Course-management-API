import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
    throw new Error("Please set MONGODB_URI in Vercel environment variables!");
}

// Serverless caching pattern
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,  // Critical for serverless
            connectTimeoutMS: 10000,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4  // Use IPv4, skip IPv6
        };

        cached.promise = mongoose.connect(DB_URI, opts).then((mongoose) => {
            console.log("✅ MongoDB connected in", NODE_ENV);
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        cached.promise = null;
        throw new Error(`MongoDB connection failed: ${error.message}`);
    }
};

export default connectDatabase;

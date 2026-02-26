import mongoose from "mongoose";
import * as dotenv from "dotenv";

// Load environment variables for local/scripts usage.
// Next.js already loads .env.local for the app, but when running
// standalone scripts (like seeding) we ensure it's loaded here too.
if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: ".env.local" });
    dotenv.config();
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

async function connectDB() {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error(
            "Please define the MONGODB_URI environment variable (e.g. in .env.local)"
        );
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;
import { MONGO_URI } from '$lib/_env';
import mongoose from "mongoose";

try {
    await mongoose.connect(MONGO_URI, {
        autoIndex: false,
        dbName: 'test'
    })
    console.log('Connected to MongoDB')
} catch (error) {
    console.error('Failed to connect to Mongo')
}
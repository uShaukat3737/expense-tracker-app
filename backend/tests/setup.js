// tests/setup.js
import mongoose from 'mongoose';
import { connectDB } from '../DB/Database.js';

beforeAll(async () => {
  await connectDB();  // Uses MONGO_URL from @shelf/jest-mongodb
  if (global.gc) global.gc();  // Memory cleanup
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
  if (global.gc) global.gc();
});

afterAll(async () => {
  await mongoose.disconnect();
  if (global.gc) global.gc();
});
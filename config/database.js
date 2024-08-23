import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://younji:${MONGO_PASSWORD}@3days.difhc.mongodb.net/?retryWrites=true&w=majority&appName=3days`;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    return client;
  } catch (e) {
    console.error("DB 연결 실패", e);
    process.exit(1); // 서버 종료
  }
}
export default connectDB;

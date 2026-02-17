import { config } from "dotenv";

const isVercel = process.env.VERCEL || process.env.VERCEL_ENV;

if (!isVercel) {
  const result = config({ path: `.env` });
  
  if (result.error) {
    console.warn("No .env file found, using process.env variables");
  }
} else {
  console.log("Running in Vercel environment, using Vercel environment variables");
}

export const {
  PORT = 3000,
  NODE_ENV = "development",
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN = "7d",
  ARCJET_KEY,
  ARCJET_ENV,
  QSTASH_URL, QSTASH_TOKEN,
  FRONT_END_URL
} = process.env;
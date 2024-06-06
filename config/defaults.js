import { readFileSync } from "node:fs";
import dotenv from "dotenv";

dotenv.config();

export default {
  port: +process.env.PORT || 3000,
  salt: +process.env.SALT,
  otpTokenTtl: +process.env.OTP_TOKEN_TTL,
  accessTokenTtl: +process.env.ACCESS_TOKEN_TTL,
  refreshTokenTtl: +process.env.REFRESH_TOKEN_TTL,
  privateKey: +process.env.PRIVATE_KEY,
  publicKey: +process.env.PUBLIC_KEY,
  mailerAccount: process.env.GOOGLE_ACCOUNT,
  mailerPassword: process.env.GOOGLE_PASSWORD,
  backBlazeAppKey: process.env.BACKBLAZE_APPLICATION_KEY,
  backBlazeAppKeyID: process.env.BACKBLAZE_APPLICATION_KEY_ID,
  backBlazeBucketID: process.env.BACKBLAZE_BUCKET_ID,
  backBlazeBucketName: process.env.BACKBLAZE_BUCKET_NAME,
  dbUri: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  expiresIn: +process.env.EXPIRES_IN,
  privateKey: process.env.PRIVATE_KEY || readFileSync("private-key.pem"),
  publicKey: process.env.PUBLIC_KEY || readFileSync("public-key.pem"),
  environment: process.env.NODE_ENV,
  prod: process.env.PROD_ROUTE,
  dev: process.env.DEV_ROUTE,
};

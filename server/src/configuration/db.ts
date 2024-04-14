import * as dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

export const config = {
  mongo: {
    uri: MONGODB_URI,
  },
  server: {
    port: PORT,
  },
};

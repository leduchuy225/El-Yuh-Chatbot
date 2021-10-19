import { config } from "dotenv";
import { ConnectionOptions } from "typeorm";

config();

export const OrmConfig: { [key: string]: ConnectionOptions } = {
  development: {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "postgres",
    entities: ["src/entities/**/*.ts"],
    synchronize: true,
    connectTimeoutMS: 5000,
  },
  production: {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: ["src/entities/**/*.ts"],
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

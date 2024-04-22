import "server-only";
import dotenv from "dotenv";

dotenv.config();

(function checkProcessEnvIntegrity() {
  if (process.env.ENVIRONMENT !== "PROD" && process.env.ENVIRONMENT !== "DEV") {
    throw Error(
      `.env: ENVIRONMENT needs to be "PROD" or "DEV". Recieved: "${process.env.ENVIRONMENT}"`
    );
  }
  if (!process.env.DATABASE_URL) {
    throw Error(
      `.env: DATABASE_URL is required. Recieved: "${process.env.DATABASE_URL}"`
    );
  }
})();

export const { ENVIRONMENT, DATABASE_URL } = process.env;

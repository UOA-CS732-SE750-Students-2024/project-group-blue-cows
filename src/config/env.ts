import dotenv from "dotenv";

dotenv.config();

(function checkProcessEnvIntegrity() {
  if (process.env.ENVIRONMENT !== "PROD" && process.env.ENVIRONMENT !== "DEV") {
    throw Error(
      `.env: ENVIRONMENT needs to be "PROD" or "DEV". Received: "${process.env.ENVIRONMENT}"`
    );
  }
  if (!process.env.DATABASE_URL) {
    throw Error(
      `.env: DATABASE_URL is required. Received: "${process.env.DATABASE_URL}"`
    );
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      `.env: STRIPE_SECRET_KEY is required. Received: "${process.env.STRIPE_SECRET_KEY}"`
    );
  }
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error(
      `.env: STRIPE_WEBHOOK_SECRET is required. Received: "${process.env.STRIPE_WEBHOOK_SECRET}"`
    );
  }
})();

export const {
  ENVIRONMENT,
  DATABASE_URL,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
} = process.env;

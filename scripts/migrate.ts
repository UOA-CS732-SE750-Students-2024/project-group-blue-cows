import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "../src/config/db";

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "scripts/migrations",
    });

    console.log("Migration successful");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();

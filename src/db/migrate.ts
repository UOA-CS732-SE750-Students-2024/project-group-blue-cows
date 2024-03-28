import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "./config";

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations",
    });

    console.log("Migration successful");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();

import { db } from "../src/config/db";

const main = async () => {
  try {
    console.log("Seeding database");
    // Delete all data
    // await db.delete(<table>);
    // await db.insert(<table>).values([<test data here>]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();

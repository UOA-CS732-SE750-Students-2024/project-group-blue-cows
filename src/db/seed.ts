import { students } from "./schema";
import { db } from "./config";

const main = async () => {
  try {
    console.log("Seeding database");
    // Delete all data
    await db.delete(students);
    await db.insert(students).values([
      {
        name: "Lucy Zhu",
        email: "lzhu613@aucklanduni.ac.nz",
        year_of_study: 4,
      },
      {
        name: "Nate Williamson",
        email: "nwil508@aucklanduni.ac.nz",
        year_of_study: 3,
      },
      {
        name: "Tristan Mona",
        email: "tmon261@aucklanduni.ac.nz",
        year_of_study: 4,
      },
      {
        name: "Vishva Dave",
        email: "vdav604@aucklanduni.ac.nz",
        year_of_study: 4,
      },
      {
        name: "Alex Hope",
        email: "ahop089@aucklanduni.ac.nz",
        year_of_study: 4,
      },
      {
        name: "Luca Eastwood",
        email: "leas022@aucklanduni.ac.nz",
        year_of_study: 4,
      },
      {
        name: "Naren Rohan",
        email: "nroh555@aucklanduni.ac.nz",
        year_of_study: 4,
      },
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();

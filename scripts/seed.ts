import { users } from "@/schemas/authSchema";
import { db } from "../src/config/db";
import clubSchema from "@/schemas/clubSchema";
import membershipSchema from "@/schemas/membershipSchema";

const main = async () => {
  try {
    console.log("Seeding database");
    await db.delete(users);
    await db.insert(users).values([
      {
        id: "f7f2bb91-37b2-4a4c-8219-c9b71b5cb996",
        name: "Lucy Zhu",
        email: "lzhu613@aucklanduni.ac.nz",
        upi: "abc",
        year_of_study: 4,
        student_id: "abc"
      },
      {
        id: "ffa1d88a-65fd-4f59-97bc-fcaa43213a2e",
        name: "Nate Williamson",
        email: "nwil508@aucklanduni.ac.nz",
        upi: "def",
        year_of_study: 3,
        student_id: "def"
      },
      {
        id: "34c3c762-6676-4ca1-b4b5-3dac925c6bbc",
        name: "Tristan Mona",
        email: "tmon261@aucklanduni.ac.nz",
        upi: "ghi",
        year_of_study: 4,
        student_id: "ghi",
      },
      {
        id: "e03eeb13-fe30-499d-96a5-d61d2e6f70b6",
        name: "Vishva Dave",
        email: "vdav604@aucklanduni.ac.nz",
        upi: "ghi",
        year_of_study: 4,
        student_id: "ghi",
      },
      {
        id: "a6574eb8-7764-4198-b2b4-280cf0190669",
        name: "Alex Hope",
        email: "ahop089@aucklanduni.ac.nz",
        upi: "ghi",
        year_of_study: 4,
        student_id: "ghi",
      },
      {
        id: "c7406194-344c-4f12-bb54-db74024d0a46",
        name: "Luca Eastwood",
        email: "leas022@aucklanduni.ac.nz",
        upi: "ghi",
        year_of_study: 4,
        student_id: "ghi",
      },
      {
        id: "3fbec3a7-13b9-4cb1-a690-5e30b4ae186d",
        name: "Naren Rohan",
        email: "nroh555@aucklanduni.ac.nz",
        upi: "ghi",
        year_of_study: 4,
        student_id: "ghi",
      },
    ]);
    await db.delete(clubSchema);
    await db.insert(clubSchema).values([
      {
        id: 1,
        name: "WDCC",
        description: "A club for cows",
        membership_fee: "0.00",
        logo: "test",
        category: "Academic"
      },
      {
        id: 2,
        name: "DEVS",
        description: "A club for real developers",
        membership_fee: "0.00",
        logo: "test",
        category: "Academic"
      }]);
      await db.delete(membershipSchema);
      await db.insert(membershipSchema).values([
        {
          club: 1,
          user: "f7f2bb91-37b2-4a4c-8219-c9b71b5cb996",
          paid: false,
          isAdmin: true,
        },
        {
          club: 1,
          user: "ffa1d88a-65fd-4f59-97bc-fcaa43213a2e",
          paid: false,
          isAdmin: true,
        },
        {
          club: 1,
          user: "34c3c762-6676-4ca1-b4b5-3dac925c6bbc",
          paid: false,
          isAdmin: true,
        },
        {
          club: 1,
          user: "e03eeb13-fe30-499d-96a5-d61d2e6f70b6",
          paid: false,
          isAdmin: true,
        },
        {
          club: 2,
          user: "a6574eb8-7764-4198-b2b4-280cf0190669",
          paid: false,
          isAdmin: true,
        },
        {
          club: 2,
          user: "c7406194-344c-4f12-bb54-db74024d0a46",
          paid: false,
          isAdmin: true,
        },
        {
          club: 1,
          user: "3fbec3a7-13b9-4cb1-a690-5e30b4ae186d",
          paid: false,
          isAdmin: true,
        },
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();

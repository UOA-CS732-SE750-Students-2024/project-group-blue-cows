import { users } from "@/schemas/authSchema";
import "server-only";
import { db } from "../../config/db";
import { postUserDto } from "@/Dtos/user/PostUserDto";

export async function postUser(user: postUserDto) {
  try {
    const result = await db
      .insert(users)
      .values([user])
      .returning({ insertedId: users.id });
    return result.at(0)?.insertedId;
  } catch (error) {
    throw new Error("Problem with creating a new user");
  }
}

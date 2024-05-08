import { UpdateUserDto } from "@/Dtos/user/UpdateUserDto";
import { db } from "@/config/db";
import { users } from "@/schemas/authSchema";
import { eq } from "drizzle-orm";
import "server-only";

export async function updateUserWithId(
  updatedFields: UpdateUserDto,
  userId: string
) {
  await db.update(users).set(updatedFields).where(eq(users.id, userId));
}

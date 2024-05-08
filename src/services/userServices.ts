"use server";
import { getUsers } from "@/gateway/user/getUsers";
import { getUserByEmail } from "@/gateway/user/getUserByEmail";
import "server-only";
import { UpdateUserDto } from "@/Dtos/user/UpdateUserDto"; // Fix the import statement to match the correct file name
import { auth } from "@/util/auth";
import { AppUser } from "@/schemas/authSchema";
import { updateUserWithId } from "@/gateway/user/updateUser";

export async function getAllUsers() {
  // All this does is proxy the gateway request, a real service may do the same or more advanced logic
  return getUsers();
}

export async function fetchUserByEmail(email: string) {
  return getUserByEmail(email);
}

export async function updateUser(updatedFields: UpdateUserDto) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  // Ensure a user can only update their own profile
  const user = session.user as AppUser;

  await updateUserWithId(updatedFields, user.id);
}

"use server";
import { getUsers} from "@/gateway/user/getUsers";
import {getUserByEmail} from "@/gateway/user/getUserByEmail";
import "server-only";

export async function getAllUsers() {
  // All this does is proxy the gateway request, a real service may do the same or more advanced logic
  return getUsers();
}

export async function fetchUserByEmail(email: string) {
  return getUserByEmail(email);
}


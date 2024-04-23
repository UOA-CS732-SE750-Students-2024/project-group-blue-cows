"use server";
import { getStudents } from "@/gateway/db";
import "server-only";

export async function getStudentsDemo() {
  // All this does is proxy the gateway request, a real service may do the same or more advanced logic
  return getStudents();
}

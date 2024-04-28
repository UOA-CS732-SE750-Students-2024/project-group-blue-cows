"use client";
import { Button } from "@/components/ui/button";
import { showToastDemo } from "@/util/toastUtils";
import { getUsers } from "@/services/userServices";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SignIn } from "@/components/ui/sign-in";
import { SignOut } from "@/components/ui/sign-out";
import { User } from "next-auth";
import { getUser } from "@/services/authServices";
import { AppUser } from "@/schemas/authSchema";

// Use this page to test your components
export default function TestPage() {
  // redirect("/clubs"); // Uncomment me for the submission

  // Next https://nextjs.org/docs
  // Shadcn https://ui.shadcn.com/
  // react-toastify https://fkhadra.github.io/react-toastify/introduction

  // To get the type from Drizzle create a corresponding interface
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);

  useEffect(() => {
    getUsers().then(setAllUsers);
  }, []);

  // Getting the auth state within a client component
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined); // if the session does not exist, user will be undefined

  useEffect(() => {
    getUser().then((session) => {
      setCurrentUser(session?.user);
    });
  }, []); // empty dependency array, will only run on component mount

  return (
    <main className="h-screen grid justify-center content-center">
      <h1>Test</h1>
      <p>{currentUser ? "Signed in" : "Signed out"}</p>
      <p>Name: {currentUser?.name || "Undefined"}</p>
      <p>Email: {currentUser?.email || "Undefined"}</p>
      <SignIn></SignIn>
      <SignOut></SignOut>
      <Button onClick={() => showToastDemo("🍞!")}>🍞</Button>
      <Table className="w-100">
        <TableCaption>All users in the database.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Year</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.year_of_study}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

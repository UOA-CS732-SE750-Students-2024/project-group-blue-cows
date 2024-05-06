"use client";
import {
  BackButton,
  BlueButton,
  YellowButton,
} from "@/components/misc/buttons";
import { Button } from "@/components/ui/button";
import { openModal } from "@/util/modalUtils";
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
import { AppUser } from "@/schemas/authSchema";
import { getUser } from "@/services/authServices";
import { getAllMembers, postClub } from "@/services/clubServices";
import { User } from "next-auth";
import {
  createOptionForm,
  getAllOptions,
  removeOptionsForm,
  updateOptionsForm,
} from "@/services/optionsFormServices";
import { putOptionsForm } from "@/gateway/putOptionsForm";
import { deleteOptionsForm } from "@/gateway/deleteOptionsForm";
import { getOptionsForClub } from "@/gateway/getOptionsForClub";

export default function TestPage() {
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

  const handleData = async () => {
    const values = await getAllMembers(2);
    console.log(values);
  };

  return (
    <main className="h-screen grid justify-center content-center py-16 ">
      <h1>Test</h1>
      <p>{currentUser ? "Signed in" : "Signed out"}</p>
      <p>Name: {currentUser?.name || "Undefined"}</p>
      <p>Email: {currentUser?.email || "Undefined"}</p>
      <Button onClick={() => showToastDemo("🍞!")}>🍞</Button>
      <Button
        onClick={() =>
          postClub(
            {
              name: "SESA",
              description: "A club for nerds",
              membership_fee: "0.00",
              logo: "test",
              category: "Academic",
            },
            {
              id: "a6574eb8-7764-4198-b2b4-280cf0190669",
              name: "Alex Hope",
              email: "ahop089@aucklanduni.ac.nz",
              emailVerified: new Date(),
              image: "gdffghgd",
              upi: "ahop",
              year_of_study: 4,
              student_id: "814",
            }
          )
        }
      >
        Post Club
      </Button>
      <Button
        onClick={() =>
          createOptionForm({
            clubId: 2,
            order: 2,
            name: "favourite-animal",
            type: "string",
          })
        }
      >
        create form
      </Button>
      <Button onClick={() => updateOptionsForm(1, { order: 2 })}>
        update form
      </Button>
      <Button onClick={() => removeOptionsForm(1)}>remove form</Button>
      <Button onClick={async () => console.log(await getAllOptions(2))}>
        get forms for club
      </Button>
      <Table>
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

      <Button className="ml-10" onClick={handleData}>
        Test
      </Button>

      <YellowButton onClick={() => showToastDemo("Yellow Button")}>
        Yellow Button
      </YellowButton>
      <BlueButton onClick={() => showToastDemo("Blue Button")}>
        Blue Button
      </BlueButton>
      <BackButton onClick={() => showToastDemo("Back Button")}></BackButton>

      <BlueButton
        onClick={() =>
          openModal({
            content: <YellowButton>Wow</YellowButton>,
            title: "Test",
            className: "hover:bg-red-100",
          })
        }
      >
        Open Modal
      </BlueButton>
    </main>
  );
}

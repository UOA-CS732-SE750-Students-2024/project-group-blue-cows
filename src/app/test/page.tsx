"use client";
import {
  BackButton,
  BlueButton,
  YellowButton,
} from "@/components/misc/buttons";
import { Button } from "@/components/ui/button";
import { openModal } from "@/util/modalUtils";
import { showToastDemo } from "@/util/toastUtils";
import { getAllUsers } from "@/services/userServices";
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
import { updateForm, getAllExtendedFields } from "@/services/clubFormFieldServices";
import {
  addImageToGallery,
  getAllImagesForClub,
  removeImageFromGallery,
} from "@/services/imageServices";
import {
  addSocialLink,
  getAllSocialsForClub,
  removeSocialLink,
  updateSocialLink,
} from "@/services/socialsServices";

export default function TestPage() {
  // Next https://nextjs.org/docs
  // Shadcn https://ui.shadcn.com/
  // react-toastify https://fkhadra.github.io/react-toastify/introduction

  // To get the type from Drizzle create a corresponding interface
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);

  useEffect(() => {
    getAllUsers().then(setAllUsers);
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
          updateForm([
            {
              clubId: 2,
              order: 1,
              name: "favourite-colour",
              type: "string",
              description: "string"
            },
            {
              clubId: 2,
              order: 4,
              name: "favourite-animal",
              type: "string",
              description: "string"
            },
            {
              clubId: 2,
              order: 3,
              name: "favourite-song",
              type: "string",
              description: "string"
            },
            {
              clubId: 2,
              order: 2,
              name: "favourite-food",
              type: "string",
              description: "string"
            },
          ])
        }
      >
        create form
      </Button>
      <Button onClick={async () => console.log(await getAllExtendedFields(1))}>
        get forms for club
      </Button>
      <Button
        onClick={() =>
          addImageToGallery({
            clubId: 1,
            imageUrl: "https://i.ytimg.com/vi/koGaFHRGmLw/maxresdefault.jpg",
            title: "ming",
          })
        }
      >
        add image
      </Button>
      <Button onClick={() => removeImageFromGallery(1)}> remove image</Button>
      <Button onClick={async () => console.log(await getAllImagesForClub(1))}>
        {" "}
        get images
      </Button>
      <Button
        onClick={() =>
          addSocialLink({
            clubId: 1,
            link: "instagram.com",
            tag: "insta",
            type: "instagram",
          })
        }
      >
        add social link
      </Button>
      <Button onClick={() => removeSocialLink(1)}> remove social link</Button>
      <Button
        onClick={() =>
          updateSocialLink(1, { link: "string", tag: "string", type: "string" })
        }
      >
        update social link
      </Button>
      <Button onClick={async () => console.log(await getAllSocialsForClub(1))}>
        get social links
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

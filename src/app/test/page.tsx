"use client";
import {
  BackButton,
  BlueButton,
  MiniArrowButton,
  MiniIconButton,
  YellowButton,
} from "@/components/misc/buttons";
import { Button } from "@/components/ui/button";
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
import {
  getAllMembers,
  getListOfAdminsForClub,
  postClub,
} from "@/services/clubServices";
import {
  addFormInputs,
  getAllFieldInputsForClub,
  getAllFieldInputsForUser,
  getFieldInputForUser,
} from "@/services/formFieldInputServices";
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
import { getAllUsers } from "@/services/userServices";
import { alert, confirm } from "@/util/modalUtils";
import { showToastDemo } from "@/util/toastUtils";
import { User } from "next-auth";
import { useEffect, useState } from "react";

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
      {/* <Button
        onClick={() =>
          addMember({
            club: 1,
            user: "a6574eb8-7764-4198-b2b4-280cf0190669",
            paid: false,
            isAdmin: false,
          })
        }
      >
        leave Club
      </Button>
      <Button
        onClick={() => removeMember(1, "a6574eb8-7764-4198-b2b4-280cf0190669")}
      >
        leave Club
      </Button>
      <Button onClick={() => removeAllMembers(1)}>
        remove all users from club
      </Button>
      <Button
        onClick={() =>
          updateForm(
            [
              {
                name: "favourite-colour",
                type: "string",
                description: "string",
              },
              {
                name: "favourite-animal",
                type: "string",
                description: "string",
              },
              {
                name: "favourite-song",
                type: "string",
                description: "string",
              },
              {
                name: "favourite-food",
                type: "string",
                description: "string",
              },
            ],
            2
          )
        }
      >
        create form
      </Button>
      <Button onClick={async () => console.log(await getAllExtendedFields(2))}>
        get forms for club
      </Button> */}
      {/* <Button
        onClick={() =>
          addImageToGallery({
            clubId: 1,
            imageUrl: "https://i.ytimg.com/vi/koGaFHRGmLw/maxresdefault.jpg",
            title: "ming",
          })
        }
      >
        add image
      </Button> */}
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
      <Button
        onClick={async () => console.log(await getListOfAdminsForClub(2))}
      >
        get admins for club
      </Button>
      <YellowButton
        onClick={() =>
          addFormInputs(
            [
              { fieldName: "favourite-colour", value: "red" },
              { fieldName: "favourite-animal", value: "bear" },
              { fieldName: "favourite-drink", value: "fanta" },
            ],
            1,
            "a6574eb8-7764-4198-b2b4-280cf0190669"
          )
        }
      >
        adds Form Field Inputs
      </YellowButton>
      <YellowButton
        onClick={async () =>
          console.log(
            await getFieldInputForUser(
              "favourite-colour",
              "a6574eb8-7764-4198-b2b4-280cf0190669"
            )
          )
        }
      >
        get field input by name for user
      </YellowButton>
      <YellowButton
        onClick={async () =>
          console.log(
            await getAllFieldInputsForUser(
              "a6574eb8-7764-4198-b2b4-280cf0190669"
            )
          )
        }
      >
        get all field inputs for user
      </YellowButton>
      <YellowButton
        onClick={async () => console.log(await getAllFieldInputsForClub(1))}
      >
        get all field inputs for club
      </YellowButton>
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

      <p>Fully Customisable Modals!</p>
      <BlueButton
        onClick={async () => {
          const response = await confirm({
            content: <YellowButton>Wow</YellowButton>,
            title: "Test",
            className: "hover:bg-red-100",
          });
          console.log(response);
        }}
      >
        src/util/modalUtils/confirm()
      </BlueButton>
      <YellowButton
        onClick={async () => {
          const response = await alert({
            content: <h1>Alert!</h1>,
            title: "Test",
            className: "hover:bg-red-100 w-[20em] h-[12em]",
          });
          console.log(response);
        }}
      >
        src/util/modalUtils/alert()
      </YellowButton>

      <MiniIconButton
        className="saturation-0"
        icon="/delete.svg"
        alt="delete"
        onClick={() => showToastDemo("Never gonna")}
      />
      <MiniIconButton
        icon="/setting-logo.png"
        alt="Settings"
        onClick={() => showToastDemo("Never gonna")}
      />
      <MiniArrowButton
        className="rotate-90"
        onClick={() => showToastDemo("🍞")}
      />
    </main>
  );
}

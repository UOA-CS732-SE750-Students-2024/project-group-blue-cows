import { useState, useEffect } from "react";
import { getClubById, getAllMembers, getListOfAdminsForClub } from "@/services/clubServices";
import { Club } from "@/schemas/clubSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import MembershipDashboard from "@/components/ui/membership-dashboard";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
// import ClubEditForm from "@/components/form/club-edit-information";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminProvider, useAdmin } from "@/components/admin/AdminPageContext";
import { notFound } from "next/navigation";
import { YellowButton } from "@/components/misc/buttons";
import { AddNewExecButton, CoverImageUpload, EditClubInformation, EditRegistrationFormButton, GalleryImageUpload, LogoImageUpload, ViewMembersButton } from "@/components/admin/adminPageClientComponents";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default async function AdminEditPage({
  params,
}: {
  params: { clubId: string };
}) {
  console.log(params);

  const clubData = await getClubById(Number(params.clubId));
  if (clubData) {
    console.log(clubData.name);
  } else {
    console.log("No club data found");
  }

  const membershipData = {
    degree: 150,
    yearLevel: 200,
  };

  interface TableData {
    name: string;
  }

  const execs = await getListOfAdminsForClub(Number(params.clubId));
  console.log(execs);

  const tableData = execs.map(exec => ({
    name: exec.name
  }));

  // Copies the registration link to the clipboard
  //TODO: INSERT LINK
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText("insert the form link here")
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  const scrollToEditForm = () => {
    const editFormDiv = document.getElementById("edit-form");
    if (editFormDiv) {
      editFormDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AdminProvider initialClub={clubData as Club}>
      <div className="h-[calc(100vh-4rem)] w-full">
        <div className="flex px-10 pt-4 pb-2">
          <div className="w-1/10">
            <button className="bg-customAccent hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
              {clubData?.name}
            </button>
          </div>
          <div className="w-9/10"></div>
        </div>

        <div className="flex px-10">
          <div className="w-1/10">
            <img
              src={clubData?.logo}
              alt="Square Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-9/10">
            <div className="ml-5 flex flex-col">
              <div className="flex items-start">
                <p className="text-lg font-bold">
                  {clubData?.name || "Loading Club Name..."}
                </p>
              </div>
              <div className="flex items-start">
                <p>
                  Also known as: {clubData?.name || "WDCC"}, WDCC UoA, Admin
                  Editing Club ID: {clubData?.id || "Loading ID"}
                </p>
              </div>
              <div className="flex items-start">
                <EditClubInformation
                  clubData={clubData as Club}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3 px-10 py-4">
          <Card>
            <CardHeader>
              <div className="text-xl">Registration Form</div>
              <CardDescription>
                View and/or update the the club registration form, including
                information and custom fields.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditRegistrationFormButton
                clubData={clubData as Club}
                className="mt-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* --------------------- Show Membership Count */}

        <Card className="mt-5">
          <div className="m-5">
            <p className="text-lg">Membership Count</p>
            <div className="flex justify-center items-center h-auto my-2 p-2 bg-customLight rounded-lg">
              <div className="text-center">
                <h1 className="text-lg md:text-xl lg:text-2xl">
                  {
                    (await getAllMembers(clubData?.id as number))
                      .membersFullData.length
                  }
                </h1>
                <h2 className="text-sm md:text-md lg:text-lg">
                  Registered Members
                </h2>
              </div>
            </div>
            <ViewMembersButton clubData={clubData as Club} className="mt-2" />
          </div>
        </Card>
      </div>

      {/* --------------------- View Executives Table */}

      <div className="w-2/3 p-4">
        <Card>
          <CardHeader>
            <p className="text-lg">Executive Members (Admin)</p>
            <CardDescription>
              View and/or update the the club registration form, including
              information and custom fields.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddNewExecButton clubData={clubData as Club} className="mt-2" />
            <div className="overflow-scroll" style={{ height: "300px" }}>
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableCell className="font-bold">Name</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {execs.map((exec, index) => (
                    <TableRow key={index}>
                      <TableCell>{exec.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ---------------- EDIT DESCRIPTION COMPONENT */}
      <div className="p-10" id="edit-form">
        <div className="w-full flex flex-col gap-4">
          <div className="flex">
            <div className="w-1/2 p-4">
              <Card className="p-2">
                <p>DESCRIPTION</p>
                {/* <Textarea
                        value={clubData?.description}
                        >
            </Textarea> */}
              </Card>
            </div>

            {/* ---------------- EDIT ADDITIONAL INFORMATION COMPONENT */}

            <div className="w-1/2 p-4">
              <Card className="p-2">
                <p>ADDITIONAL INFORMATION</p>
              </Card>
            </div>
          </div>

          {/* ---------------- EDIT SOCIALS COMPONENT */}
          <div className="flex">
            <div className="w-1/3 p-4">
              <Card className="p-2">
                <p> SOCIAL MEDIA </p>
                {/* <SocialMediaEditor socials={socials} /> */}
              </Card>
            </div>

            {/* ---------------- UPLOAD LOGO COMPONENT */}
            <div className="w-2/3 p-4">
              <Card className="p-2">
                <p>UPLOAD LOGO</p>
                <LogoImageUpload clubData={clubData as Club} className="mt-2" />
              </Card>
            </div>
          </div>
          <div className="flex">
            {/* ---------------- UPLOAD TO GALLERY COMPONENT */}
            <div className="w-2/3 p-4">
              <Card className="p-2">
                <p>UPLOAD TO GALLERY</p>
                <GalleryImageUpload
                  clubData={clubData as Club}
                  className="mt-2"
                />
              </Card>
            </div>

            {/* ---------------- UPLOAD COVER IMAGE COMPONENT */}
            <div className="w-2/3 p-4">
              <Card className="p-2">
                <p>UPLOAD COVER IMAGE</p>
                <p>note about file dimensions here</p>
                <CoverImageUpload
                  clubData={clubData as Club}
                  className="mt-2"
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminProvider>
  );
}

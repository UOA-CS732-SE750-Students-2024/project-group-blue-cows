import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Club } from "@/schemas/clubSchema";

import {
  getAllMembers,
  getClubById,
  getListOfAdminsForClub,
} from "@/services/clubServices";
import {
  AdminSocials,
  Description,
} from "@/components/admin/nateAdminComponents";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { notFound } from "next/navigation";
import { GetSocialDto } from "@/Dtos/social/GetSocialDto";
import {
  addSocialLink,
  getAllSocialsForClub,
} from "@/services/socialsServices";

import Link from "next/link";
import { AdminProvider, useAdmin } from "@/components/admin/AdminPageContext";
import {
  AddNewExecButton,
  CoverImageUpload,
  EditCategory,
  EditClubInformation,
  EditFee,
  EditName,
  ViewMembersButton,
  EditRegistrationFormButton,
  GalleryImageUpload,
  LogoImageUpload,
} from "@/components/admin/adminPageClientComponents";

import { auth, isUserClubAdmin } from "@/util/auth";
import UnauthorisedUserPage from "@/app/unauthorised";

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
  if (!clubData) return notFound();

  async function getInitialSocials() {
    if (!clubData) return notFound();
    let initialSocials: GetSocialDto[] = await getAllSocialsForClub(
      clubData.id
    );

    async function getSocial(type: string) {
      if (!clubData) return notFound();
      function toSentenceCase(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
      const social = initialSocials.find((s) => s.type === type);
      if (!social)
        await addSocialLink({
          clubId: clubData.id,
          link: "",
          tag: toSentenceCase(type),
          type,
        });
      return social;
    }

    return await Promise.all([
      getSocial("web"),
      getSocial("facebook"),
      getSocial("instagram"),
      getSocial("discord"),
    ]);
  }

  await getInitialSocials(); // Hack: populate any null socials first
  const initialSocials = (await getInitialSocials()).map((social) => {
    if (!social) throw new Error("Socials not loaded");
    return social;
  });

  const session = await auth();
  const user = session?.user;
  const isAdmin = await isUserClubAdmin(user, params.clubId);

  if (isAdmin === false) {
    return <UnauthorisedUserPage />;
  }

  const execs = await getListOfAdminsForClub(Number(params.clubId));
  console.log(execs);

  const tableData = execs.map((exec) => ({
    name: exec.name,
  }));

  const scrollToEditForm = () => {
    const editFormDiv = document.getElementById("edit-form");
    if (editFormDiv) {
      editFormDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AdminProvider
      initialClub={clubData as Club}
      initialSocials={initialSocials}
    >
      <div className="h-auto w-full">
        <div className="flex px-10 pt-4 pb-2">
          <div className="w-1/10">
            <Link href={"/users/me/clubs"}>
              <button className="bg-customAccent hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mt-3 mb-2">
                Back to my clubs
              </button>
            </Link>
          </div>
          <div className="w-9/10"></div>
        </div>

        <div className="flex px-10">
          <div className="w-1/10">
            <img
              src={clubData?.logo}
              alt="Club Logo"
              className="w-[30vh] h-auto rounded-lg"
            />
          </div>
          <div className="w-9/10">
            <div className="ml-5 flex flex-col">
              <div className="flex items-start">
                <p className="text-2xl font-bold">
                  {clubData?.name || "Loading Club Name..."}
                </p>
              </div>
              <div className="flex items-start">
                <p>University of Auckland Student Club</p>
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
      </div>

      {/* ---------------- EDIT DESCRIPTION COMPONENT */}
      <div className="p-10" id="edit-form">
        <div className="w-full flex flex-col gap-4">
          <div className="flex">
            <Description />

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

            <AdminSocials
              className="w-1/3 p-4"
              initialSocials={initialSocials}
            />

            {/* ---------------- UPLOAD TO GALLERY COMPONENT */}
            <div className="w-2/3 p-4">
              <Card className="p-2">
                <p>UPLOAD TO GALLERY</p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- EDIT ADDITIONAL INFORMATION COMPONENT */}

      <div className="w-1/2 p-4">
        <Card className="p-2">
          <p>ADDITIONAL INFORMATION</p>
          <EditName />
          <EditFee />
          <EditCategory />
        </Card>
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
            <p className="mb-2">
              Upload photos of your club and events to display.
            </p>

            <GalleryImageUpload clubData={clubData as Club} className="mt-2" />
          </Card>
        </div>

        {/* ---------------- UPLOAD COVER IMAGE COMPONENT */}
        <div className="w-2/3 p-4">
          <Card className="p-2">
            <p>UPLOAD COVER IMAGE</p>
            <p className="mb-2">
              For an optimal display, please upload a horizontal image.
            </p>
            <CoverImageUpload clubData={clubData as Club} className="mt-2" />
          </Card>
        </div>
      </div>
    </AdminProvider>
  );
}

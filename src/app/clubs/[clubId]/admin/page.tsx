"use client";
import { useState, useEffect } from "react";
import { getClubById } from "@/services/clubServices";
import { Club } from "@/schemas/clubSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MembershipDashboard from "@/components/ui/membership-dashboard";

export default function AdminEditPage({
  params,
}: {
  params: { clubId: string };
}) {
  console.log(params);

  const [clubData, setClubData] = useState<Club | null>(null);

  // TODO: not working
  useEffect(() => {
    const getData = async () => {
      const clubData = await getClubById(Number(params.clubId));
      setClubData(clubData);
    };
    getData();
  }, []);

  console.log(clubData);

  const membershipData = {
    degree: 150,
    yearLevel: 200,
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-customGrass">
      <h1>Admin Editing Club ID: {params.clubId}</h1>

      <div className="flex p-4">
        <div className="w-1/10">
          <button className="bg-customAccent hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            Back
          </button>
        </div>
        <div className="w-9/10"></div>
      </div>

      <div className="flex px-4">
        <div className="w-1/10">
          <img
            src="/wdcc-logo.png"
            alt="Square Image"
            className="w-full h-auto"
          />
        </div>
        <div className="w-9/10">
          <div className="flex flex-col">
            <div className="flex items-start">
              <p>Web Development & Consulting Club</p>
            </div>
            <div className="flex items-start">
              <p>Also known as: WDCC, WDCC UoA</p>
            </div>
            <div className="flex items-start">
              <button className="bg-customAccent hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
                Edit Club Information
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/3 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
              <CardDescription>
                View and/or update the the club registration form, including
                information and custom fields.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Copy Public Registration Form link</p>
              <button className="bg-customAccent hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
                Edit Registration Form
              </button>
            </CardContent>
          </Card>
        </div>
        <div className="w-2/3 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Executive Members (Admin)</CardTitle>
              <CardDescription>
                View and/or update the the club registration form, including
                information and custom fields.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Copy Public Registration Form link</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/3 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Membership Count</CardTitle>
              <CardDescription>800 Registered Members</CardDescription>
            </CardHeader>
            <CardContent>
              <button className="bg-customAccent hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
                View Members
              </button>
            </CardContent>
          </Card>
        </div>
        <div className="w-2/3 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Membership Statistics</CardTitle>
              <CardDescription>
                View and/or update the the club registration form, including
                information and custom fields.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MembershipDashboard data={membershipData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

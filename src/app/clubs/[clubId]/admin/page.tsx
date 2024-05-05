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
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import ClubEditForm from "@/components/form/club-edit-form";
import { Button } from "@/components/ui/button";

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

  interface TableData {
    name: string;
    position: string;
  }

  const data: TableData[] = [
    { name: "John Doe", position: "Software Engineer" },
    { name: "Jane Smith", position: "Product Manager" },
    { name: "Alice Johnson", position: "UI/UX Designer" },
    { name: "John Doe", position: "Software Engineer" },
    { name: "Jane Smith", position: "Product Manager" },
    { name: "Alice Johnson", position: "UI/UX Designer" },
    { name: "John Doe", position: "Software Engineer" },
    { name: "Jane Smith", position: "Product Manager" },
    { name: "Alice Johnson", position: "UI/UX Designer" },
    { name: "John Doe", position: "Software Engineer" },
    { name: "Jane Smith", position: "Product Manager" },
    { name: "Alice Johnson", position: "UI/UX Designer" },
    // Add more dummy data as needed
  ];

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-customGrass">
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
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="w-9/10">
          <div className="ml-5 flex flex-col">
            <div className="flex items-start">
              <p className="text-lg">Web Development & Consulting Club</p>
            </div>
            <div className="flex items-start">
              <p>
                Also known as: WDCC, WDCC UoA, Admin Editing Club ID:{" "}
                {params.clubId}
              </p>
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
              <div className="text-xl">Registration Form</div>
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
          <Card className="mt-5">
            <div className="m-5">
              <p className="text-lg">Membership Count</p>
              <div className="flex justify-center items-center h-auto my-2 p-2 bg-customLight rounded-lg">
                <div className="text-center">
                  <h1 className="text-lg md:text-xl lg:text-2xl">
                    800
                    <br />
                    Registered Members
                  </h1>
                </div>
              </div>
              <button className="bg-customAccent hover:bg-blue-700 text-black font-bold p-2 px-4 rounded">
                View Members
              </button>
            </div>
          </Card>
        </div>
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
              <button className="bg-customAccent hover:bg-blue-700 text-black font-bold p-2 px-4 rounded">
                Add new exec
              </button>
              <div className="overflow-scroll" style={{ height: "300px" }}>
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableCell className="font-bold">Name</TableCell>
                      <TableCell className="font-bold">Position</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.position}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Please leave this chunk alone for now */}
      {/* <div className="flex">
        <div className="w-1/3 p-4">
          <Card>
            <div className="m-5">
              <p className="text-lg">Membership Count</p>
              <div className="flex justify-center items-center h-auto my-2 p-2 bg-customLight rounded-lg">
                <div className="text-center">
                  <h1 className="text-lg md:text-xl lg:text-2xl">
                    800
                    <br />
                    Registered Members
                  </h1>
                </div>
              </div>
              <button className="bg-customAccent hover:bg-blue-700 text-black font-bold p-2 px-4 rounded">
                View Members
              </button>
            </div>
          </Card>
        </div>
        <div className="w-2/3 p-4">
          <Card>
            <CardHeader>
              <p className="text-lg">Membership Statistics</p>
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
      </div> */}

      {/* form */}
      <div className="p-4">
        <ClubEditForm />
      </div>
    </div>
  );
}

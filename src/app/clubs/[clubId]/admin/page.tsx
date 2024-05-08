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
// import MembershipDashboard from "@/components/ui/membership-dashboard";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import ClubEditForm from "@/components/form/club-edit-information";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminProvider, useAdmin } from "@/components/admin/AdminPageContext";
import { notFound } from "next/navigation";
import { YellowButton } from "@/components/misc/buttons";

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

  // const {club} = useAdmin();


  



  // const [clubData, setClubData] = useState<Club | null>(null);

  // // TODO: not working
  // useEffect(() => {
  //   const getData = async () => {
  //     const clubData = await getClubById(Number(params.clubId));
  //     setClubData(clubData);
  //   };
  //   getData();
  // }, []);

  // console.log(clubData);

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
  ];

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


    <AdminProvider initialClub = {clubData as Club} >


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
              Also known as: {clubData?.name || "WDCC"}, WDCC UoA, Admin Editing Club ID:{" "}
              {clubData?.id || "Loading ID"}
            </p>
          </div>
          <div className="flex items-start">
          <YellowButton
        className="mt-3"  // Add any additional specific classes, if needed
        onClick={scrollToEditForm}
      >
        Edit Club Information
      </YellowButton>
    </div>
          </div>
        </div>
      </div>
    </div>

















      

      

      




    </AdminProvider>






    // <div className="h-[calc(100vh-4rem)] w-full">
    //   <div className="flex px-10 pt-4 pb-2">
    //     <div className="w-1/10">
    //       <button className="bg-customAccent hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
    //         Back
    //       </button>
    //     </div>
    //     <div className="w-9/10"></div>
    //   </div>

    //   <div className="flex px-10">
    //     <div className="w-1/10">
    //       <img
    //         src="/wdcc-logo.png"
    //         alt="Square Image"
    //         className="w-full h-auto rounded-lg"
    //       />
    //     </div>
    //     <div className="w-9/10">
    //       <div className="ml-5 flex flex-col">
    //         <div className="flex items-start">
    //           <p className="text-lg font-bold">
    //             Web Development & Consulting Club
    //           </p>
    //         </div>
    //         <div className="flex items-start">
    //           <p>
    //             Also known as: WDCC, WDCC UoA, Admin Editing Club ID:{" "}
    //             {params.clubId}
    //           </p>
    //         </div>
    //         <div className="flex items-start">
    //           <Button
    //             className="mt-3 bg-customAccent text-black"
    //             onClick={() => scrollToEditForm()}
    //           >
    //             Edit Club Information
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex">
    //     <div className="w-1/3 px-10 py-4">
    //       <Card>
    //         <CardHeader>
    //           <div className="text-xl">Registration Form</div>
    //           <CardDescription>
    //             View and/or update the the club registration form, including
    //             information and custom fields.
    //           </CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //           <div
    //             className="flex items-center bg-slate-200 p-1 rounded-md hover:bg-slate-300 cursor-pointer"
    //             onClick={handleCopyClick}
    //           >
    //             <div className="w-10%">
    //               <img
    //                 src="/copy-icon.svg"
    //                 alt="Copy Icon"
    //                 className="w-5 m-1 h-auto rounded-lg"
    //               />
    //             </div>
    //             <div className="w-90% ">
    //               <p className="text-xs">Copy Public Registration Form link</p>
    //             </div>
    //           </div>
    //           <Link href={"/clubs/1/admin/registration"}>
    //             <Button className="mt-3 bg-customAccent text-black">
    //               Edit Registration Form
    //             </Button>
    //           </Link>
    //         </CardContent>
    //       </Card>
    //       <Card className="mt-5">
    //         <div className="m-5">
    //           <p className="text-lg">Membership Count</p>
    //           <div className="flex justify-center items-center h-auto my-2 p-2 bg-customLight rounded-lg">
    //             <div className="text-center">
    //               <h1 className="text-lg md:text-xl lg:text-2xl">800</h1>
    //               <h2 className="text-sm md:text-md lg:text-lg">
    //                 Registered Members
    //               </h2>
    //             </div>
    //           </div>
    //           <Button className="mt-3 bg-customAccent text-black">
    //             View Members
    //           </Button>
    //         </div>
    //       </Card>
    //     </div>
    //     <div className="w-2/3 p-4">
    //       <Card>
    //         <CardHeader>
    //           <p className="text-lg">Executive Members (Admin)</p>
    //           <CardDescription>
    //             View and/or update the the club registration form, including
    //             information and custom fields.
    //           </CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //           <Button className="mt-3 bg-customAccent text-black">
    //             Add New Exec
    //           </Button>
    //           <div className="overflow-scroll" style={{ height: "300px" }}>
    //             <Table className="min-w-full">
    //               <TableHeader>
    //                 <TableRow>
    //                   <TableCell className="font-bold">Name</TableCell>
    //                   <TableCell className="font-bold">Position</TableCell>
    //                 </TableRow>
    //               </TableHeader>
    //               <TableBody>
    //                 {data.map((row, index) => (
    //                   <TableRow key={index}>
    //                     <TableCell>{row.name}</TableCell>
    //                     <TableCell>{row.position}</TableCell>
    //                   </TableRow>
    //                 ))}
    //               </TableBody>
    //             </Table>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </div>

    //   {/* Please leave this chunk alone for now */}
    //   {/* <div className="flex">
    //     <div className="w-1/3 p-4">
    //       <Card>
    //         <div className="m-5">
    //           <p className="text-lg">Membership Count</p>
    //           <div className="flex justify-center items-center h-auto my-2 p-2 bg-customLight rounded-lg">
    //             <div className="text-center">
    //               <h1 className="text-lg md:text-xl lg:text-2xl">
    //                 800
    //                 <br />
    //                 Registered Members
    //               </h1>
    //             </div>
    //           </div>
    //           <button className="bg-customAccent hover:bg-blue-700 text-black font-bold p-2 px-4 rounded">
    //             View Members
    //           </button>
    //         </div>
    //       </Card>
    //     </div>
    //     <div className="w-2/3 p-4">
    //       <Card>
    //         <CardHeader>
    //           <p className="text-lg">Membership Statistics</p>
    //           <CardDescription>
    //             View and/or update the the club registration form, including
    //             information and custom fields.
    //           </CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //           <MembershipDashboard data={membershipData} />
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </div> */}

    //   {/* form */}
    //   <div className="p-10" id="edit-form">
    //     <ClubEditForm clubId = {params.clubId}/>
    //   </div>
    // </div>
);
}

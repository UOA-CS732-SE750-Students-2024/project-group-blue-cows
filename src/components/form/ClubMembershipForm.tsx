"use client"; // to get react to know it's a client compponent

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postClub } from "@/services/clubServices";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import { UploadButton } from "@/util/uploadThingUtils";
import { AppUser, users } from "@/schemas/authSchema";
import { useSession } from "next-auth/react";

import * as z from "zod";
import { postMember } from "@/gateway/postMember";
import { Club } from "@/schemas/clubSchema";

const formSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required").toUpperCase(),
  email: z.string().min(1, "Email is required"),
  upi: z.string().min(7, "UPI is required"),
  university: z.string().min(1, "University is required"),
  yearLevel: z.number().min(1, "Year level is required"),
  degree: z.string().min(1, "Degree is required"),
  major: z.string().min(1, "Specialisation/Major is required"),
});

export default function ClubRegistrationForm() {
  const { data: sessionData } = useSession(); // Get the session data
  const [clubData, setClubData] = useState<Club | null>(null);
  const user = sessionData?.user as AppUser; // Type assertion for the user

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: user.student_id || "123456789",
      name: user.name || "",
      email: user.email || "",
      upi: user.upi || "",
      university: "University of Auckland",
      yearLevel: user.year_of_study || 0,
      degree: "",
      major: "",
    },
  });
  const clubId = clubData?.id;

  // const handleSubmit = (values: z.infer<typeof formSchema>) => {
  //   console.log(values);
  //   postMember(clubId, user, isPaid, isAdmin)
  //     .then(() => {
  //       form.reset(); // Reset form fields after successful submission
  //     })
  //     .catch((error) => {
  //       console.error("Submission error:", error);
  //     });
  // };

  // form.watch("category");

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <Card className="w-full bg-[#FFD166]">
          <CardHeader>
            <CardTitle>MEMBERSHIP BENEFITS</CardTitle>
          </CardHeader>
          <CardContent>
            {" "}
            {/* TODO: Allow content to be passed as a prop */}
            <ul className="list-disc list-inside">
              <li>
                Stay up to date with upcoming events, projects, and
                competitions.
              </li>
              <li>
                Become eligible to participate in our projects and competitions.
              </li>
            </ul>
          </CardContent>
        </Card>
        <h1>PRE-POPULATED DETAILS</h1>
        <sub className="text-it">Click on the boxes to edit.</sub>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">Full Name</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={user?.name || "Name"}
                    type="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">
                  Preferred Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter club description"
                    type="description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /> */}

        {/* <FormField
          control={form.control}
          name="logo"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input type="file" placeholder="shadcn" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        /> */}

        <Button
          type="submit"
          className="w-full bg-[#087DF1] color-white uppercase"
        >
          Register Club on Cowmunity
        </Button>
      </form>
    </Form>
  );
}

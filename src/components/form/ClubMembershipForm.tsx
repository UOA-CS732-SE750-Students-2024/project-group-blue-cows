"use client"; // to get react to know it's a client compponent

import React, { useEffect, useState } from "react";
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
import { getUser } from "@/services/authServices";
import LoadingSpinner from "../ui/loading-spinner";

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

export default function ClubRegistrationForm({
  params,
}: {
  params: { clubId: string };
}) {
  const { data: sessionData } = useSession(); // Get the session data
  const [clubData, setClubData] = useState<Club | null>(null);
  const user = sessionData?.user as AppUser;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      id: user?.student_id || "123456789",
      email: user?.email || "",
      upi: user?.upi || "",
      university: "University of Auckland",
      yearLevel: user?.year_of_study || 0,
      degree: "",
      major: "",
    },
  });

  if (!user) {
    return <LoadingSpinner />; // Or replace with a loading spinner
  }

  // const handleSubmit = (values: z.infer<typeof formSchema>) => {
  //   console.log(values);
  //   postMember(user)
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
            <CardTitle>Membership Benefits</CardTitle>
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
        <h1 className="-mb-2">PRE-POPULATED DETAILS</h1>
        <sub className=" italic mb-2">Click on the boxes to edit.</sub>
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
                    placeholder="Enter name"
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
                    defaultValue={user?.email || "Email"}
                    placeholder="Enter email"
                    type="description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="grid grid-rows-3 grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="upi"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="font-bold">
                    UPI (e.g. abcd123)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter UPI"
                      defaultValue={user?.upi || "UPI"}
                      type="description"
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
            name="upi"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="font-bold">
                    Student ID (e.g. 123456789)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Student ID"
                      defaultValue={user?.student_id || 0}
                      type="description"
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
            name="university"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="font-bold">University</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter University"
                      defaultValue="University of Auckland"
                      type="description"
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
            name="yearLevel"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="font-bold">Year Level</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your year level"
                      defaultValue={user?.year_of_study || 1}
                      type="description"
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
            name="degree"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="font-bold">Degree</FormLabel>
                  <FormControl>
                    {/* TODO - add degree to schema???*/}
                    <Input
                      placeholder="Enter your degree"
                      type="description"
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
            name="major"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="font-bold">
                    Major / Specialisation
                  </FormLabel>
                  <FormControl>
                    {/* TODO - add degree to schema???*/}
                    <Input
                      placeholder="Enter your major"
                      type="description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#087DF1] color-white uppercase"
        >
          SUBMIT
        </Button>
      </form>
    </Form>
  );
}

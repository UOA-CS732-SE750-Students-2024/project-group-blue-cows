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

const formSchema = z.object({
  name: z.string().min(1, "Name is required").toUpperCase(),
  description: z.string().min(1, "Description is required"),
  membership_fee: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid fee amount"),
  logo: z.string().min(1, "Logo is required"),
  category: z.enum([
    "Academic and specialist",
    "Sport",
    "Special Interest",
    "Religious and Spiritual",
    "Cultural",
    "Causes",
  ]),
});

export default function ClubRegistrationForm() {
  const { data: sessionData } = useSession(); // Get the session data
  const user = sessionData?.user as AppUser; // Type assertion for the user

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      membership_fee: "",
      logo: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    postClub(values, user)
      .then(() => {
        form.reset(); // Reset form fields after successful submission
      })
      .catch((error) => {
        console.error("Submission error:", error);
      });
  };

  form.watch("category");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <Card className="w-full bg-customAccent">
          <CardHeader>
            <CardTitle>Registering a club</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The <span className="text-red-500">*</span>
              &nbsp;indicates that a field is required. To register a club on
              Cowmunity, your club must already be approved and registered at
              the University of Auckland.
            </p>
          </CardContent>
          <CardFooter>
            <p>
              If this is not the case, please first ensure that your club meets
              all the requirements listed&nbsp;
              <a
                href="https://www.auckland.ac.nz/en/on-campus/life-on-campus/clubs-societies/how-to-start-a-club.html"
                className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
              >
                here
              </a>
              , apply to start your club, and await approval.
            </p>
          </CardFooter>
        </Card>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">
                  Club Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter club name" type="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">
                  Club Description <span className="text-red-500">*</span>
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
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">
                  Club Category <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      {field.value ? (
                        <SelectValue placeholder="Select a category for your new club" />
                      ) : (
                        "Select a category for your new club"
                      )}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Academic and specialist">
                      Academic and specialist
                    </SelectItem>
                    <SelectItem value="Sport">Sport</SelectItem>
                    <SelectItem value="Special Interest">
                      Special Interest
                    </SelectItem>
                    <SelectItem value="Religious and spiritual">
                      Religious and spiritual
                    </SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                    <SelectItem value="Causes">Causes</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="membership_fee"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">
                  Membership Fee
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter fee amount"
                    type="membership_fee"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* <FormField
          control={form.control}
          name="logo"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Dummy Input until File Upload Component</FormLabel>
                <FormControl>
                  <Input placeholder="Logo URL here" type="logo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        /> */}

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">
                  Club Logo <span className="text-red-500">*</span>
                </FormLabel>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    alert("Upload Completed");

                    //Convert url to string
                    const logoUrl = res[0].url.toString();
                    form.setValue("logo", logoUrl, { shouldValidate: true });
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
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
          className="w-full bg-customPrimary color-white uppercase"
        >
          Register Club on Cowmunity
        </Button>
      </form>
    </Form>
  );
}

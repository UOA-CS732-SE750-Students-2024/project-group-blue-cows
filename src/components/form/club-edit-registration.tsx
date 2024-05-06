"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postClub } from "@/services/clubServices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { AppUser } from "@/schemas/authSchema";
import { useSession } from "next-auth/react";

import * as z from "zod";
import { GetExtendedFormFieldDto } from "@/Dtos/GetExtendedFormFieldDto";

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
    "Religious and spiritual",
    "Cultural",
    "Causes",
  ]),
});

export default function EditClubRegistrationForm({
  clubId,
  initialExtendedFields,
}: {
  clubId: number;
  initialExtendedFields: GetExtendedFormFieldDto[];
}) {
  const { data: sessionData } = useSession(); // Get the session data
  const user = sessionData?.user as AppUser; // Type assertion for the user

  const [extendedFields, setExtendedFields] = useState(initialExtendedFields);
  console.log(extendedFields);

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
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <Card className="w-full bg-[#FFD166]">
            <CardContent className="py-6">
              <p>
                By default, Cowlaboration will collect default information about
                a member, including their full name, email, UPI, student ID,
                University, year level, degree, and specialisation/majors. If
                you would like to collect additional information about your club
                members, you may add custom fields to your club&apos;s
                registration form here.
              </p>
            </CardContent>
          </Card>

          <Button>Add New Short-Answer Question</Button>

          <Card className="w-full bg-customLight mb-5">
            <CardHeader>
              <CardTitle>New Short-Answer Question</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="font-bold">Question:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter new question"
                          type="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}

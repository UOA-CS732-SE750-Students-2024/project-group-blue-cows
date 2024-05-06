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
import { BlueButton } from "../misc/buttons";

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
          <Card className="w-full bg-customLight">
            <CardHeader>
              <CardTitle>New Question</CardTitle>
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

          <BlueButton className="w-full">Add New Question</BlueButton>
        </form>
      </Form>
    </div>
  );
}

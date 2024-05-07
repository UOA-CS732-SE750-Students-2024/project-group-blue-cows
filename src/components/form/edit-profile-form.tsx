"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { AppUser } from "@/schemas/authSchema";
import { Button } from "../ui/button";

// All fields are optional, they are just used to help the user fill in forms
const formSchema = z.object({
  studentId: z
    .string()
    .regex(/^\d+$/, "Please enter a valid student ID") // matches any number of digits
    .optional(),
  upi: z
    .string()
    .regex(/^[(a-z)|(A-Z)]{4}\d{3}$/, " Please enter a valid UPI")
    .optional(), // matches 4 letters followed by 3 digits e.g. leas022 (no official documentation on UPI format, so using this for the MVP)
  yearOfStudy: z
    .string()
    .regex(/^[1-9]{1}?$/, "Please enter a valid year of study") // matches any number between 1 and 9 i.e. 1st to 9th year
    .optional(),
});

// The edit profile form contains fields for the user to edit their student ID number, UPI and year level
// The name, email and profile picture fields are not editable, as they are managed by the user's identity provider (Google at the moment)
// Each field will be wrapped with FormField
export default function EditProfileForm() {
  const { data: sessionData } = useSession(); // Get the session data
  const user = sessionData?.user as AppUser; // Type assertion for the user

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: String(user?.student_id) || "", // need to use string, so blank values are allowed
      upi: user?.upi || "",
      yearOfStudy: String(user?.year_of_study) || "", // need to use string, so blank values are allowed
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    form.reset(); // Reset form fields after successful submission
  };

  // Doesn't use the form wrapper so we can maximize page width
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {/* disabled and uncontrolled as we're not pushing these fields to the DB*/}
        <Input disabled defaultValue={user?.name || ""} />

        <Input disabled defaultValue={user?.email || ""} />

        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">Student ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 123456789"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>

        <FormField
          control={form.control}
          name="upi"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">UPI</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. jdoe123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>

        <FormField
          control={form.control}
          name="yearOfStudy"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">Year of Study</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 1" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>

        <Button
          type="submit"
          className="w-full bg-[#087DF1] color-white uppercase"
        >
          Save Profile
        </Button>
      </form>
    </Form>
  );
}

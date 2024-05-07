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

const formSchema = z.object({
  studentId: z.string().optional(),
  upi: z.string().optional(),
  yearLevel: z.string().optional(),
});

// The edit profile form contains fields for the user to edit their student ID number, UPI and year level
// Using react form hook to handle form state
// Each field will be wrapped with FormField
export default function EditProfileForm() {
  const { data: sessionData } = useSession(); // Get the session data
  const user = sessionData?.user as AppUser; // Type assertion for the user

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: String(user?.student_id) || "", // need to use string, so blank values are allowed
      upi: user?.upi || "",
      yearLevel: String(user?.year_of_study) || "", // need to use string, so blank values are allowed
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    form.reset(); // Reset form fields after successful submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                  <Input placeholder="e.g. 12345678" type="number" {...field} />
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
                  <Input placeholder="e.g. jdoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>

        <FormField
          control={form.control}
          name="yearLevel"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">Year Level</FormLabel>
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

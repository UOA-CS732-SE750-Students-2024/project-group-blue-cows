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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { AppUser } from "@/schemas/authSchema";
import { Button } from "../ui/button";
import { UpdateUserDto } from "@/Dtos/user/UpdateUserDto";
import { updateUser } from "@/services/userServices";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../ui/loading-spinner";
import { useEffect } from "react";

// All fields are optional, they are just used to help the user fill in forms
// the regex allows for blank values, so the user can clear the field if they want
const formSchema = z.object({
  studentId: z
    .string()
    .regex(/(^\d+$)|(^$)/, "Please enter a valid student ID")
    .optional(), // matches any number of digits
  upi: z
    .string()
    .regex(/(^[(a-z)|(A-Z)]{3,4}\d{3}$)|(^$)/, " Please enter a valid UPI")
    .optional(), // matches 3-4 letters followed by 3 digits e.g. leas022 (no official documentation on UPI format, so using this for the MVP)
  yearOfStudy: z
    .string()
    .regex(/(^[1-9]{1}?$)|(^$)/, "Please enter a valid year of study")
    .optional(), // matches any number between 1 and 9 i.e. 1st to 9th year
});

// The edit profile form contains fields for the user to edit their student ID number, UPI and year level
// The name, email and profile picture fields are not editable, as they are managed by the user's identity provider (Google at the moment)
// Each field will be wrapped with FormField
export default function ProfileEditForm() {
  const router = useRouter();
  const { data, update, status } = useSession(); // Get the session data
  const user = data?.user as AppUser; // Type assertion for the user

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: user?.student_id || "", // need to use string, so blank values are allowed
      upi: user?.upi || "",
      yearOfStudy: user?.year_of_study ? String(user.year_of_study) : "", // need to use string, so blank values are allowed
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Convert values to UpdateUserDTO
    const updateUserDto: UpdateUserDto = {
      student_id: values?.studentId ? values.studentId : null,
      upi: values?.upi ? values.upi : null,
      year_of_study: values?.yearOfStudy ? Number(values.yearOfStudy) : null,
    };

    // Try to persist the changes to the user profile
    updateUser(updateUserDto)
      .then(async () => {
        await update(); // Update the session data
      })
      .then(() => {
        alert("Profile updated successfully");
        // Redirect to / using the next router
        router.push("/");
      })
      .catch((error) => {
        // Show error message
        alert("Failed to update profile");
      });
  };

  // This ensures that the form is reset when the user data is available
  useEffect(() => {
    if (status === "authenticated" && user) {
      // Set form default values once session is authenticated and user data is available
      form.reset({
        studentId: user.student_id || "",
        upi: user.upi || "",
        yearOfStudy: user.year_of_study ? String(user.year_of_study) : "",
      });
    }
  }, [status, user]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  // Doesn't use the form wrapper so we can maximize page width
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {/* disabled and uncontrolled as we're not pushing these fields to the DB*/}

        <div className="grid grid-cols-2 gap-4">
          <div className="grid-item">
            <FormItem>
              <FormLabel className="font-bold">Name</FormLabel>
              <Input disabled defaultValue={user?.name || ""} />
            </FormItem>
          </div>

          <div className="grid-item">
            <FormItem>
              <FormLabel className="font-bold">Email Address</FormLabel>
              <Input disabled defaultValue={user?.email || ""} />
            </FormItem>
          </div>

          <div className="grid-item">
            <FormItem>
              <FormLabel className="font-bold">Profile Picture</FormLabel>
              <Input disabled type="file" />
            </FormItem>
          </div>

          <div className="grid-item">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="font-bold">Student ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
          </div>

          <div className="grid-item">
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
          </div>

          <div className="grid-item">
            <FormField
              control={form.control}
              name="yearOfStudy"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="font-bold">Year of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
          </div>
        </div>

        <div className="mt-4 text-right">
          <Button
            type="submit"
            className="w-full bg-[#087DF1] color-white uppercase"
          >
            Save Profile
          </Button>
        </div>
      </form>
    </Form>
  );
}

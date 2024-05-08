"use client"; // to get react to know it's a client compponent

import {React, useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postClub } from "@/services/clubServices";
import { Card } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAllSocialsForClub } from "@/services/socialsServices";
import SocialLinks from "../misc/social-links";

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
    "Religious and spiritual",
    "Cultural",
    "Causes",
  ]),
});


export default function ClubEditForm({ clubId }) {
  const { data: sessionData } = useSession(); // Get the session data
  const user = sessionData?.user as AppUser; // Type assertion for the user

  const [socials, setSocials] = useState([]); // State to hold socials data

  useEffect(() => {
    getAllSocialsForClub(clubId).then(setSocials);
  }, [clubId]); // Adding clubId to the dependency array to ensure re-fetching if clubId changes
  


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
        <div className="flex">
          <div className="w-1/2 p-4">
            <Card className="p-2">
              <p>DESCRIPTION</p>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
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
            </Card>
          </div>
          <div className="w-1/2 p-4">
            <Card className="p-2">
              <p>ADDITIONAL INFORMATION</p>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Club Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter club name"
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
                name="category"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Club Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                      <FormLabel>Membership Fee</FormLabel>
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

              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Club Logo</FormLabel>
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          console.log("Files: ", res);
                          alert("Upload Completed");

                          //Convert url to string
                          const logoUrl = res[0].url.toString();
                          form.setValue("logo", logoUrl, {
                            shouldValidate: true,
                          });
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
            </Card>
          </div>
        </div>

        <div className="flex">
          <div className="w-1/3 p-4">
            <Card className="p-2">
              <p>SOCIAL MEDIA LINKS</p>
              <SocialLinks socials={socials} />
              {/* <div className="flex items-center p-1 rounded-md">
                <div className="w-10%">
                  <img
                    src="/copy-icon.svg"
                    alt="Copy Icon"
                    className="w-5 m-1 h-auto rounded-lg"
                  />
                </div>
                <div className="w-90% ">
                  <p className="text-xs">Social Media Link 1</p>
                </div>
              </div>
              <div className="flex items-center p-1 rounded-md">
                <div className="w-10%">
                  <img
                    src="/copy-icon.svg"
                    alt="Copy Icon"
                    className="w-5 m-1 h-auto rounded-lg"
                  />
                </div>
                <div className="w-90% ">
                  <p className="text-xs">Social Media Link 2</p>
                </div>
              </div>
              <div className="flex items-center p-1 rounded-md">
                <div className="w-10%">
                  <img
                    src="/copy-icon.svg"
                    alt="Copy Icon"
                    className="w-5 m-1 h-auto rounded-lg"
                  />
                </div>
                <div className="w-90% ">
                  <p className="text-xs">Social Media Link 3</p>
                </div>
              </div> */}
            </Card>
          </div>
          <div className="w-2/3 p-4">
            <Card className="p-2">
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>GALLERY</FormLabel>
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          console.log("Files: ", res);
                          alert("Upload Completed");

                          //Convert url to string
                          const logoUrl = res[0].url.toString();
                          form.setValue("logo", logoUrl, {
                            shouldValidate: true,
                          });
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
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}

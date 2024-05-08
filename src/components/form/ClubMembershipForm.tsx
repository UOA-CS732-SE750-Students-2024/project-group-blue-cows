"use client";
import React, { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getClubById, postClub } from "@/services/clubServices";
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
import { postMember } from "@/gateway/member/postMember";
import { Club } from "@/schemas/clubSchema";
import { getUser } from "@/services/authServices";
import LoadingSpinner from "../ui/loading-spinner";
import { Session } from "next-auth";
import { PostExtendedFormFieldDto } from "@/Dtos/extendedFormField/PostExtendedFormFieldDto";
import { get } from "http";
import { GetExtendedFormFieldDto } from "@/Dtos/GetExtendedFormFieldDto";
import { GetClubFormFieldDto } from "@/Dtos/clubFormField/GetClubFormFieldDto";
import { getClubFormFields } from "@/gateway/clubFormField/getClubFormFields";
import { notFound } from "next/navigation";

const createFormSchema = (
  formExtensions: GetClubFormFieldDto[]
): z.ZodObject<any, any, any, any, any> => {
  let schema: z.ZodRawShape = {
    id: z.string().min(1, "ID is required"),
    name: z.string().min(1, "Name is required").toUpperCase(),
    email: z.string().min(1, "Email is required"),
    upi: z.string().min(1, "UPI is required"),
    yearLevel: z.number().min(1, "Year level is required"),
  };

  formExtensions.forEach((formExtension) => {
    let field;
    switch (formExtension.type) {
      case "string":
        field = z.string().min(1, `${formExtension.name} is required`);
        break;
      case "long":
        field = z
          .string()
          .min(1, `${formExtension.name} is required`)
          .max(500, `${formExtension.name} is too long`);
        break;
      case "short":
        field = z
          .string()
          .min(1, `${formExtension.name} is required`)
          .max(50, `${formExtension.name} is too short`);
        break;
      case "number":
        field = z
          .number()
          .min(1, `${formExtension.name} is required`)
          .max(100, `${formExtension.name} is too large`);
        break;
      default:
        field = z.string().min(1, `${formExtension.name} is required`);
    }
    schema = {
      ...schema,
      [formExtension.name]: field,
    };
  });

  return z.object(schema);
};

export default function ClubRegistrationForm({
  clubId,
  club,
  clubFormFields,
}: {
  clubId: string;
  club: Club;
  clubFormFields: GetClubFormFieldDto[];
}) {
  //const [loading, setLoading] = useState(true);

  const session = useSession(); // Get the session data
  const user = session.data?.user as AppUser;

  const formSchema = createFormSchema(clubFormFields);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      id: "",
      email: "",
      upi: "",
      yearLevel: 0,
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name || "");
      form.setValue("id", user.student_id || "");
      form.setValue("email", user.email || "");
      form.setValue("upi", user.upi || "");
      form.setValue("yearLevel", user.year_of_study || 0);
    }
  }, [user]);

  if (!club) return notFound();
  // if (loading || !user) {
  //   return <LoadingSpinner />;
  // }

  // TODO - Add a submit handler to post the user to the club membership endpoint HERE

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
            {/* TODO - Allow signup description content to be passed as a prop here - ADD MEMBERSHIP DESCRIPTION TO SCHEMA? */}
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

        <div className="grid grid-rows-3 grid-cols-2 gap-4">
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

          <AdditionalFormFields clubFormFields={clubFormFields} form={form} />
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

interface AdditionalFormFieldsProps {
  clubFormFields: GetClubFormFieldDto[];
  form: UseFormReturn<any, any, undefined>; // replace with the correct type
}

const AdditionalFormFields: React.FC<AdditionalFormFieldsProps> = ({
  clubFormFields,
  form,
}) => {
  return (
    <>
      {clubFormFields.map((field) => (
        <FormField
          key={field.name}
          control={form.control}
          name={field.name}
          rules={{ required: `${field.name} is required` }}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel className="font-bold">{field.name}</FormLabel>
              <FormControl>
                <div>
                  {(() => {
                    switch (field.type) {
                      case "string":
                        return (
                          <Input
                            placeholder={`Enter ${field.name}`}
                            {...formField}
                            defaultValue={formField.value}
                          />
                        );
                      case "long":
                        return (
                          <Textarea
                            maxLength={500}
                            placeholder={`Enter ${field.name}`}
                            {...formField}
                            defaultValue={formField.value}
                            className={
                              field.type === "long"
                                ? "resize-none col-span-2"
                                : "resize-none"
                            }
                          />
                        );
                      case "short":
                        return (
                          <Input
                            maxLength={50}
                            placeholder={`Enter ${field.name}`}
                            {...formField}
                            defaultValue={formField.value}
                          />
                        );
                      case "number":
                        return (
                          <Input
                            type="number"
                            placeholder={`Enter ${field.name}`}
                            {...formField}
                            defaultValue={formField.value}
                          />
                        );
                      default:
                        return (
                          <Input
                            placeholder={`Enter ${field.name}`}
                            {...formField}
                            defaultValue={formField.value}
                          />
                        );
                    }
                  })()}
                </div>
              </FormControl>
              {field.description && <p>{field.description}</p>}
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
};

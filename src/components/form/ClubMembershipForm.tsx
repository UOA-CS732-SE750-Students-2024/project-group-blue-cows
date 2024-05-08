"use client";
import React, { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { redirect, useRouter } from "next/navigation";

import * as z from "zod";
import { Club } from "@/schemas/clubSchema";
import { getUser } from "@/services/authServices";
import { addMember, fetchMemberForClub } from "@/services/clubServices";
import { GetClubFormFieldDto } from "@/Dtos/clubFormField/GetClubFormFieldDto";
import { notFound } from "next/navigation";
import { PostMemberDto } from "@/Dtos/member/PostMemberDto";
import { addFormInputs } from "@/services/formFieldInputServices";
import { updateUser } from "@/services/userServices";
import { UpdateUserDto } from "@/Dtos/user/UpdateUserDto";
import { PostFormFieldInputDto } from "@/Dtos/formFieldInput/PostFormFieldInputDto";

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
  const [alreadyMember, setAlreadyMember] = useState(false);
  const session = useSession(); // Get the session data
  const user = session.data?.user as AppUser;
  const router = useRouter();
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
  // call updateUser for mandatory fields, addFormInputs for optional fields
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const member: PostMemberDto = {
      club: Number(clubId),
      user: user?.id || "",
      paid: false, // TODO - SEE LUCA FOR PAYMENT INTEGRATION/VALIDATION
      isAdmin: false,
    };
    const memberData = await fetchMemberForClub(user?.id, Number(clubId));
    if (memberData) {
      setAlreadyMember(true);
      alert("You are already a member of this club.");
    }
    addMember(member)
      .then(() => {
        // Split the values into mandatory and optional fields
        const mandatoryFields: UpdateUserDto = {
          student_id: values.id,
          upi: values.upi,
          year_of_study: values.yearLevel,
        };
        let optionalFields: { [key: string]: any } = Object.fromEntries(
          Object.entries(values).filter(
            ([key]) => !Object.keys(mandatoryFields).includes(key)
          )
        );
        let optionalFieldsArray: PostFormFieldInputDto[] = Object.entries(
          optionalFields
        ).map(([fieldName, value]) => ({ fieldName, value }));
        // Call updateUser for mandatory fields
        updateUser(mandatoryFields)
          .then(() => {
            // Call addFormInputs for optional fields
            addFormInputs(optionalFieldsArray, Number(clubId), user?.id || "")
              .then(() => {
                form.reset(); // Reset form fields after successful submission
                alert("Membership added successfully");
              })
              .then(() => {
                router.back();
              })
              .catch((error) => {
                console.error("Error posting form inputs: ", error);
              });
          })
          .catch((error) => {
            console.error("Error updating user: ", error);
          });
      })
      .catch((error) => {
        console.error("Submission error: ", error);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
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
                  <Input placeholder="Enter name" type="name" {...field} />
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
            name="id"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="font-bold">
                    Student ID (e.g. 123456789)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Student ID"
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

"use client"; // to get react to know it's a client compponent

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { postMember } from "@/gateway/postMember";
import { Club } from "@/schemas/clubSchema";
import { getUser } from "@/services/authServices";
import LoadingSpinner from "../ui/loading-spinner";
import { Session } from "next-auth";
import { getExtendedFormForClub } from "@/gateway/getExtendedFormForClub";

const createFormSchema = (headers: string[]) => {
  let schema: z.ZodRawShape = {
    id: z.string().min(1, "ID is required"),
    name: z.string().min(1, "Name is required").toUpperCase(),
    email: z.string().min(1, "Email is required"),
    upi: z.string().min(1, "UPI is required"),
    yearLevel: z.number().min(1, "Year level is required"),
  };

  headers.forEach((header) => {
    schema = {
      ...schema,
      [header]: z.string().min(1, `${header} is required`),
    };
  });

  return z.object(schema);
};

export default function ClubRegistrationForm({
  params,
}: {
  params: { clubId: string };
}) {
  const session = useSession(); // Get the session data
  const [clubData, setClubData] = useState<Club | null>(null); // retrieving which club the user is signing up for
  getExtendedFormForClub(Number(params.clubId)).then((res) => {
    setHeaders(res);
  });
  const user = session.data?.user as AppUser;
  const [loading, setLoading] = useState(true);
  const formSchema = createFormSchema(headers);

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
    const getData = async () => {
      const clubData = await getClubById(Number(params.clubId));
      setClubData(clubData);
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name || "");
      form.setValue("id", user.student_id || "");
      form.setValue("email", user.email || "");
      form.setValue("upi", user.upi || "");
      form.setValue("yearLevel", user.year_of_study || 0);
    }
  }, [user]);

  if (loading || !user) {
    return <LoadingSpinner />;
  }

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

type DynamicFieldsProps = {
  headers: string[];
  form: ReturnType<typeof useForm>;
};

const DynamicFields: React.FC<DynamicFieldsProps> = ({ headers, form }) => {
  return (
    <>
      {headers.map((header) => (
        <FormField
          key={header}
          control={form.control}
          name={header}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">{header}</FormLabel>
              <FormControl>
                <Input placeholder={`Enter ${header}`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
};

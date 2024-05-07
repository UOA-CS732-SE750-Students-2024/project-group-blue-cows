"use client";

import { useState } from "react";
import { UseFormReturn, UseFormWatch, useForm } from "react-hook-form";
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
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";

const formSchema = z.object({});

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
  // console.log(extendedFields);

  function addField() {
    setExtendedFields([
      ...extendedFields,
      {
        name: "",
        description: "",
        type: "text",
      },
    ]);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const handleSubmit = () => {
    addField();
    // postClub(values, user)
    //   .then(() => {
    //     form.reset(); // Reset form fields after successful submission
    //   })
    //   .catch((error) => {
    //     console.error("Submission error:", error);
    //   });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex flex-col gap-4"
        >
          {extendedFields.map((field, index) => (
            <Field
              key={extendedFields[index].name}
              index={index}
              form={form}
              field={extendedFields[index]}
            />
          ))}
          <BlueButton type="submit" className="w-full">
            Add New Question
          </BlueButton>
        </form>
      </Form>
    </div>
  );
}

function Field({
  form,
  index,
  field,
}: {
  form: UseFormReturn<z.infer<typeof formSchema> | any>;
  index: number;
  field: GetExtendedFormFieldDto;
}) {
  return (
    <Card className="w-full bg-customLight">
      <CardContent className="pt-4">
        <FormField
          control={form.control}
          name="name"
          render={() => {
            return (
              <FormItem>
                <FormLabel className="font-bold">
                  Question {index + 1}:
                </FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      className="inline w-1/6"
                      placeholder="New field"
                      type="name"
                      value={field.name}
                      onChange={() => console.log("Change")}
                    />
                  </FormControl>
                  <Input
                    className="inline w-4/6"
                    placeholder="Description"
                    type="name"
                    value={field.description}
                    onChange={() => console.log("Change")}
                  />
                  <Select
                    defaultValue={"text"}
                    onValueChange={(value) => {
                      () => console.log(value);
                    }}
                  >
                    <SelectTrigger className="w-1/6">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Short Answer</SelectItem>
                      <SelectItem value="textArea">Long Answer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </CardContent>
    </Card>
  );
}
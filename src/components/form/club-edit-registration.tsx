"use client";

import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
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
import { BlueButton, MiniArrowButton, MiniIconButton } from "../misc/buttons";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { useRegistrationEditContext } from "@/components/form/RegistratonEditContext";

const formSchema = z.object({});

export default function EditClubRegistrationForm({
  clubId,
  initialExtendedFields,
}: {
  clubId: number;
  initialExtendedFields: GetExtendedFormFieldDto[];
}) {
  const { extendedFields, setExtendedFields } = useRegistrationEditContext();
  console.log(extendedFields);

  function addField() {
    setExtendedFields([
      ...extendedFields,
      {
        name: "",
        description: "",
        type: "short",
      },
    ]);
  }

  function changeField(index: number, field: GetExtendedFormFieldDto) {
    setExtendedFields([
      ...extendedFields.slice(0, index),
      field,
      ...extendedFields.slice(index + 1),
    ]);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addField)}
          className="w-full flex flex-col gap-4"
        >
          {extendedFields.map((field, index) => (
            <Field
              key={index}
              index={index}
              form={form}
              field={extendedFields[index]}
              changeField={changeField}
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
  changeField,
}: {
  form: UseFormReturn<z.infer<typeof formSchema> | any>;
  index: number;
  field: GetExtendedFormFieldDto;
  changeField: (index: number, field: GetExtendedFormFieldDto) => void;
}) {
  return (
    <Card className="w-full bg-customLight relative">
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
                      onChange={(event) =>
                        changeField(index, {
                          ...field,
                          name: event.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <Input
                    className="inline w-4/6"
                    placeholder="Description"
                    type="name"
                    value={field.description}
                    onChange={(event) =>
                      changeField(index, {
                        ...field,
                        description: event.target.value,
                      })
                    }
                  />
                  <Select
                    defaultValue={field.type}
                    onValueChange={(value) => {
                      changeField(index, {
                        ...field,
                        type: value,
                      });
                    }}
                  >
                    <SelectTrigger className="w-1/6">
                      <SelectValue />
                    </SelectTrigger>
                    {/* VishvaDave This dropdown doesn't render properly! Any idea why? */}
                    <SelectContent>
                      <SelectItem value="short">Short Answer</SelectItem>
                      <SelectItem value="long">Long Answer</SelectItem>
                    </SelectContent>
                  </Select>
                  <EditButtons />
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

function EditButtons() {
  return (
    <div className="absolute top-3 right-6 flex">
      <MiniArrowButton className="rotate-90" />
      <MiniArrowButton className="-rotate-90" />
      <MiniIconButton
        icon="/delete.svg"
        alt="delete"
        className="hover:bg-red-200"
      />
    </div>
  );
}
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { GetExtendedFormFieldDto } from "@/Dtos/extendedFormField/GetExtendedFormFieldDto";
import { useRegistrationEditContext } from "@/components/form/RegistratonEditContext";
import * as z from "zod";
import { BlueButton, MiniArrowButton, MiniIconButton } from "../misc/buttons";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({});

interface EditFieldFunctions {
  readonly addField: () => void;
  readonly changeField: (index: number, field: GetExtendedFormFieldDto) => void;
  readonly deleteField: (index: number) => void;
  readonly moveFieldUp: (index: number) => void;
  readonly moveFieldDown: (index: number) => void;
}

export default function EditClubRegistrationForm() {
  const { extendedFields, setExtendedFields } = useRegistrationEditContext();

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

  function deleteField(index: number) {
    setExtendedFields([
      ...extendedFields.slice(0, index),
      ...extendedFields.slice(index + 1),
    ]);
  }

  function moveFieldUp(index: number) {
    if (index === 0) return;
    const newFields = [...extendedFields];
    [newFields[index], newFields[index - 1]] = [
      newFields[index - 1],
      newFields[index],
    ];
    setExtendedFields(newFields);
  }

  function moveFieldDown(index: number) {
    if (index === extendedFields.length - 1) return;
    const newFields = [...extendedFields];
    [newFields[index], newFields[index + 1]] = [
      newFields[index + 1],
      newFields[index],
    ];
    setExtendedFields(newFields);
  }

  const editFieldFunctions = {
    addField,
    changeField,
    deleteField,
    moveFieldUp,
    moveFieldDown,
  } as const;

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
              editFieldFunctions={editFieldFunctions}
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
  editFieldFunctions,
}: {
  form: UseFormReturn<z.infer<typeof formSchema> | any>;
  index: number;
  field: GetExtendedFormFieldDto;
  editFieldFunctions: EditFieldFunctions;
}) {
  const { changeField } = editFieldFunctions;

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
                    {/* @lukisoo This dropdown doesn't render properly! Any idea why? */}
                    <SelectContent>
                      <SelectItem value="short">Short Answer</SelectItem>
                      <SelectItem value="long">Long Answer</SelectItem>
                    </SelectContent>
                  </Select>
                  <EditButtons
                    index={index}
                    editFieldFunctions={editFieldFunctions}
                  />
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

function EditButtons({
  index,
  editFieldFunctions,
}: {
  index: number;
  editFieldFunctions: EditFieldFunctions;
}) {
  const { moveFieldUp, moveFieldDown, deleteField } = editFieldFunctions;

  return (
    <div className="absolute top-3 right-6 flex">
      <MiniArrowButton
        onClick={() => moveFieldUp(index)}
        className="rotate-90"
      />
      <MiniArrowButton
        onClick={() => moveFieldDown(index)}
        className="-rotate-90"
      />
      <MiniIconButton
        onClick={() => deleteField(index)}
        icon="/delete.svg"
        alt="delete"
        className="hover:bg-red-200"
      />
    </div>
  );
}
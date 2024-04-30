"use client"; // to get react to know it's a client compponent

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import {Form, FormField} from "@/components/ui/form";

import * as z from "zod";

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  membership_fee: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid fee amount"),
  logo: z.string().min(1, "Logo is required"),
  category: z.enum(["Academic", "Sport", "Cultural", "Other"]), // TODO: Update categories after discussing with team
});

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    postClub(data); // 'postClub` is the function which handles the data from the form to send it to the backend
  };

  return (
    <div className="container">
      <h1>Create Club</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Club ID"
          {...register("id")}
          placeholder="Enter club ID"
          type="number"
        />
        {errors.id && <span>{errors.id.message}</span>}

        <Input
          label="Club Name"
          {...register("name")}
          placeholder="Enter club name"
        />
        {errors.name && <span>{errors.name.message}</span>}

        <Textarea
          label="Description"
          {...register("description")}
          placeholder="Enter club description"
        />
        {errors.description && <span>{errors.description.message}</span>}

        <Input
          label="Membership Fee"
          {...register("membership_fee")}
          placeholder="Enter membership fee"
          type="text"
        />
        {errors.membership_fee && <span>{errors.membership_fee.message}</span>}

        <Input
          label="Logo"
          {...register("logo")}
          placeholder="Upload club logo here"
        />
        {errors.logo && <span>{errors.logo.message}</span>}

        <Select {...register("category")}>
          <SelectTrigger aria-label="Select category">
            {/* Display selected value here */}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Academic and specialist">
              Academic and specialist
            </SelectItem>
            <SelectItem value="Sport">Sport</SelectItem>
            <SelectItem value="Special Interest">Special Interest</SelectItem>
            <SelectItem value="Religious and spiritual">
              Religious and spiritual
            </SelectItem>
            <SelectItem value="Causes">Causes</SelectItem>
            <SelectItem value="Cultural">Cultural</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && <span>{errors.category.message}</span>}

        <Button type="submit">Create Club</Button>
      </form>
    </div>
  );
}

// export default function Page() {
//     const { register, handleSubmit, formState: { errors } } = useForm();

//     const onSubmit = data => console.log(data);

//     return (
//         <div className="container">
//             <h1>Create Club</h1>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <Input
//                     label="Club Name"
//                     {...register("clubName", { required: true })}
//                     placeholder="Enter club name"
//                 />
//                 {errors.clubName && <span>This field is required</span>}
//                 <div className="spacer"></div>
//                 <Textarea
//                     label="Description"
//                     {...register("description", { required: "Description is required." })}
//                     placeholder="Enter club description"
//                 />
//                 {errors.description && <span>{errors.description.message}</span>}
//                 <div className="spacer"></div>
//                 <Button type="submit">Create Club</Button>
//             </form>
//         </div>
//     );
// }

"use client"; // to get react to know it's a client compponent

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

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
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);

    return (
        <div className="container">
            <h1>Create Club</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Club Name"
                    {...register("clubName", { required: true })}
                    placeholder="Enter club name"
                />
                {errors.clubName && <span>This field is required</span>}
                <div className="spacer"></div>
                <Textarea
                    label="Description"
                    {...register("description", { required: "Description is required." })}
                    placeholder="Enter club description"
                />
                {errors.description && <span>{errors.description.message}</span>}
                <div className="spacer"></div>
                <Button type="submit">Create Club</Button>
            </form>
        </div>
    );
}

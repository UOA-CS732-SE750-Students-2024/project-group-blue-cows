"use client"; // to get react to know it's a client compponent

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postClub } from "@/services/clubServices";
import { Card, CardContent, CardHeader, CardFooter, CardDescription, CardTitle } from "@/components/ui/card";


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
import {Form, FormField, FormItem, FormLabel, FormMessage, FormControl} from "@/components/ui/form";

import * as z from "zod";

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  membership_fee: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid fee amount"),
    logo: z.string().min(1, "Logo is required"),
  // logo: z.object({
  //   file: z.any().refine((file) => {
  //     // Ensure file is validated only in browser environment
  //     return typeof FileList !== "undefined"
  //       ? file instanceof FileList && file?.length === 1
  //       : true;
  //   }, "File is required."),
  // }),
  category: z.enum([
    "Academic and specialist",
    "Sport",
    "Special Interest",
    "Religious and spiritual",
    "Cultural",
    "Causes",
  ]),
});



export default function ClubRegistrationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: "",
      description: "",
      membership_fee: "",
      logo: "",
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    postClub(values, {
      id: "a6574eb8-7764-4198-b2b4-280cf0190669",
      name: "Alex Hope",
      email: "ahop089@aucklanduni.ac.nz",
      emailVerified: new Date(),
      image: "gdffghgd",
      upi: "ahop",
      year_of_study: 4,
      student_id: "814",
    }).then(() => {
      form.reset(); // Reset form fields after successful submission
    }).catch((error) => {
      console.error("Submission error:", error);
    });
  };
  

  form.watch("category");
  const fileRef = form.register("file");


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-md w-full flex flex-col gap-4"
      >

<Card >
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">Club Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter club name" type="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">Club Description</FormLabel>
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
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">Club Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      {/* <SelectValue placeholder="Select a category for your new club" /> */}
                      {field.value ? <SelectValue placeholder="Select a category for your new club" /> : "Select a category for your new club"}

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
                <FormLabel className="font-bold">Membership Fee</FormLabel>
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
                <FormLabel>Dummy Input until File Upload Component</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Logo URL here"
                    type="logo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />



        {/* <FormField
          control={form.control}
          name="logo"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input type="file" placeholder="shadcn" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        /> */}

        <Button type="submit" className="w-full">
          Create Club
        </Button>
      </form>
    </Form>
  );
}



//Latest 'stable' version
// export default function Page() {
//   const onSubmit = (data) => {
//     console.log(data);
//     postClub(data); // 'postClub` is the function which handles the data from the form to send it to the backend
//   };

//   return (
//     <div className="container">
//       <h1>Create Club</h1>
//       <Form schema={formSchema} onSubmit={onSubmit}>
//         <FormField name="name" label="Club Name" placeholder="Enter club name" />
//         <FormField name="description" label="Description" placeholder="Enter club description" as="textarea" />
//         <FormField name="membership_fee" label="Membership Fee" placeholder="Enter membership fee" type="text" />
//         <FormField name="logo" label="Logo" placeholder="Upload club logo here" />
//         <FormItem>
//                 <FormLabel>Filter Clubs</FormLabel>
//                 <Select onValueChange={field.onChange}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="Academic and specialist">Academic and specialist</SelectItem>
//                     <SelectItem value="Sport">Sport</SelectItem>
//                     <SelectItem value="Special Interest">Special Interest</SelectItem>
//                     <SelectItem value="Religious and spiritual">Religious and spiritual</SelectItem>
//                     <SelectItem value="Causes">Causes</SelectItem>
//                     <SelectItem value="Cultural">Cultural</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//         <Button type="submit">Create Club</Button>
//       </Form>
//     </div>
//   );
// }


//ORIGINAL
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

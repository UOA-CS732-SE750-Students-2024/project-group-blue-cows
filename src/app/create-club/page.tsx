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
import ClubRegistrationForm from "@/components/ui/club-registration-form";
import FormWrapper from "@/components/ui/form-wrapper";



export default function Page() {

  return (
    <section className="w-full pt-20">
      <div className="h-screen flex items-center justify-center">
        <FormWrapper label="Create a Club" title="Maker Space">
          <ClubRegistrationForm />
        </FormWrapper>
      </div>
    </section>
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

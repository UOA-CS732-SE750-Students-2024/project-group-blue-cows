import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface ClubMembershipFormOptionalProps {
  headers: string[];
}

const formSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required").toUpperCase(),
  email: z.string().min(1, "Email is required"),
  upi: z.string().min(1, "UPI is required"),
  yearLevel: z.number().min(1, "Year level is required"),
});

const ClubMembershipFormOptional = ({ headers }: { headers: string[] }) => {

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      id: "",
      email: "",
      upi: "",
      yearLevel: 0,
    }

  return (
    <FormField
    control={form.control}
    name="name"
    render={({ field }) =>
      {headers.map((header, index) => (
        <div key={index}>
          <label htmlFor={header}>{header}</label>
          <input type="text" id={header} name={header} />
        </div>
      ))}
      <button type="submit">Submit</button>
    </FormField>
  );
};

/*{
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
}*/

// const ClubMembershipFormOptional = ({ headers }: { headers: string[] }) => {
//     return (
//       <form>
//         {headers.map((header, index) => (
//           <div key={index}>
//             <label htmlFor={header}>{header}</label>
//             <input type="text" id={header} name={header} />
//           </div>
//         ))}
//         <button type="submit">Submit</button>
//       </form>
//     );
//   };

//   export default ClubMembershipFormOptional;

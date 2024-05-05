import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

interface ClubMembershipFormOptionalProps {
  headers: string[];
}

const ClubMembershipFormOptional = ({ headers }: { headers: string[] }) => {
  return (
    <form>
      {headers.map((header, index) => (
        <div key={index}>
          <label htmlFor={header}>{header}</label>
          <input type="text" id={header} name={header} />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

{
  /* <FormField
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
/> */
}

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

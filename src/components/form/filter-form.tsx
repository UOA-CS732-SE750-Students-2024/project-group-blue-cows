"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";

const formSchema = z.object({
  category: z.enum(["Academic and specialist", "Sport", "Special Interest", "Religious and spiritual", "Causes", "Cultural"]),
});

export function FilterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  form.watch("category");

  const handleRegister = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-3 ml-2 mt-5">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Filter Clubs</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Academic and specialist">Academic and specialist</SelectItem>
                    <SelectItem value="Sport">Sport</SelectItem>
                    <SelectItem value="Special Interest">Special Interest</SelectItem>
                    <SelectItem value="Religious and spiritual">Religious and spiritual</SelectItem>
                    <SelectItem value="Causes">Causes</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">
          Filter
        </Button>
      </form>
    </Form>
  );
}
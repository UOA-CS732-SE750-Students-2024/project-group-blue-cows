"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  category: z.enum([
    "All",
    "Academic and specialist",
    "Sport",
    "Special Interest",
    "Religious and spiritual",
    "Causes",
    "Cultural",
  ]),
});

export function FilterForm({
  filter,
  setFilter,
}: {
  filter: string | null;
  setFilter: (arg0: string | null) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  form.watch("category");

  const handleChange = (
    field: ControllerRenderProps<z.infer<typeof formSchema>>,
    value: string
  ) => {
    field.onChange(value);
    setFilter(value !== "All" ? value : null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => console.log(filter))}>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Filter Clubs</FormLabel>
                <Select onValueChange={(value) => handleChange(field, value)}>
                  <FormControl>
                    <SelectTrigger>
                      {/* Be aware this placeholder 'all' is different from the SelectItem 'all' */}
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="inline">
                    <SelectItem value="All">All</SelectItem>
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
                    <SelectItem value="Causes">Causes</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </form>
    </Form>
  );
}

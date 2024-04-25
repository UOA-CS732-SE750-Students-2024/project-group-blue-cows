"use client";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { showToastDemo } from "@/util/toastUtils";
import { getStudentsDemo } from "@/services/studentServices";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Use this page to test your components
export default function TestPage() {
  // redirect("/clubs"); // Uncomment me for the submission

  // Next https://nextjs.org/docs
  // Shadcn https://ui.shadcn.com/
  // react-toastify https://fkhadra.github.io/react-toastify/introduction

  // How do you actually get the Typescript type from Drizzle?
  const [students, setStudents] = useState<
    {
      id: number;
      name: string;
      email: string;
      year_of_study: number | null;
    }[]
  >([]);

  useEffect(() => {
    getStudentsDemo().then(setStudents);
  }, []);

  return (
    <main className="h-screen grid justify-center content-center">
      <h1>Test</h1>
      <Button onClick={() => showToastDemo("🍞!")}>🍞</Button>
      <Table className="w-100">
        <TableCaption>Students in the database.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Year</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.year_of_study}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

"use client";
import { ColumnDef } from "@tanstack/react-table";
import { studentData } from "@/gateway/getAllMembersForClub";

export const membersColumns: ColumnDef<studentData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "upi",
    header: "Upi",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "studentId",
    header: "Student_Id",
  },
];

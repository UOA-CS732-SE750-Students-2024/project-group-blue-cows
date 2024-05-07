"use client";
import { ColumnDef } from "@tanstack/react-table";
import { studentData } from "@/gateway/member/getAllMembersForClub";

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
    accessorKey: "year_of_study",
    header: "Year",
  },
  {
    accessorKey: "student_id",
    header: "Student_Id",
  },
];

"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { DataTable } from "../ui/data-table";
import { studentData } from "@/gateway/member/getAllMembersForClub";
import { useState } from "react";
import { useMemberPage } from "./MemberPageContext";

const columns: ColumnDef<studentData>[] = [
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
  {
    accessorKey: "paid",
    header: "Paid",
  },
  {
    accessorKey: "isAdmin",
    header: "Admin",
  },
];

export default function MembersTable() {
  const { members } = useMemberPage();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    columns,
    data: members,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Input
            placeholder="Filter by name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="shadow-md"
          />
        </div>
        <div className="flex-1">
          <Input
            placeholder="Filter by UPI..."
            value={(table.getColumn("upi")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn("upi")?.setFilterValue(event.target.value);
            }}
            className="shadow-md"
          />
        </div>
      </div>
      <DataTable table={table} columns={columns} />
    </div>
  );
}

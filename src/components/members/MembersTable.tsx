"use client";
import * as React from "react";
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
import { studentData } from "@/gateway/getAllMembersForClub";
import { useRef } from "react";

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
];

export default function MembersTable({ members }: { members: studentData[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const fileInput = useRef<HTMLInputElement>(null);

  // const handleUploadFile = async (
  //   evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   evt.preventDefault();

  //   const formData = new FormData();
  //   formData.append("file", fileInput?.current?.files?.[0]!);
  //   if (club) {
  //     const studentData = await importClubMembers(club.id, formData);
  //     console.log(studentData);
  //   }
  // };

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
      <form className="flex flex-col gap-4">
        <label>
          <span>Upload a file</span>
          <input type="file" name="file" ref={fileInput} />
        </label>
        {/* <Button className="w-60" type="submit" onClick={handleUploadFile}>
          Submit
        </Button> */}
      </form>
    </div>
  );
}

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
import { Button } from "../ui/button";
import { Club } from "@/schemas/clubSchema";
import { exportClubMembers } from "@/services/clubServices";
import { showToastDemo } from "@/util/toastUtils";

type MembersTableProps = {
  membersData: studentData[];
  clubData: Club | null;
};

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
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "studentId",
    header: "Student_Id",
  },
];

export default function MembersTable({
  membersData,
  clubData,
}: MembersTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleClick = async () => {
    if (clubData) {
      try {
        const csvData = await exportClubMembers(clubData.id);
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${clubData.name}_membership.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        showToastDemo("Yay! Data successfully exported");
      } catch (error) {
        showToastDemo("Problem with exporting data");
      }
    }
  };

  const table = useReactTable({
    columns,
    data: membersData,
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
      <div className="flex items-center">
        <div className="flex-1">
          {/* TODO -
          REPLACE HEADER WITH RELEVANT CLUB NAME FROM API */}
        </div>
      </div>
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
        <div className="flex">
          <Button onClick={handleClick} className="bg-customAccent text-black">
            Export Data
          </Button>
        </div>
      </div>

      <DataTable table={table} columns={columns} />
    </div>
  );
}

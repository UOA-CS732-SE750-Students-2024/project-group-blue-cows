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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { DataTable } from "./data-table";
import { studentData } from "@/gateway/member/getAllMembersForClub";
import { Button } from "./button";
import { Club } from "@/schemas/clubSchema";
import { exportClubMembers, importClubMembers } from "@/services/clubServices";
import { showToastDemo } from "@/util/toastUtils";
import { useRef } from "react";

type MembersTableProps = {
  columns: ColumnDef<studentData>[];
  membersData: studentData[];
  clubData: Club | null;
};

export function MembersTable({
  columns,
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
  const fileInput = useRef<HTMLInputElement>(null);

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

  const handleUploadFile = async (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("file", fileInput?.current?.files?.[0]!);
    if (clubData) {
      showToastDemo("Loading... Refresh page when finish loading");
      await importClubMembers(clubData.id, formData);
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
    <div className="w-full h-auto p-10">
      <div className="flex justify-between">
        <div className="w-1/3 p-4">
          <h2 className=" text-3xl font-extrabold">{clubData?.name} Members</h2>
          <p>There are X registered members for CLUB NAME.</p>
        </div>
        <div className="w-1/3 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Import Data</CardTitle>
              <CardDescription>
                Have existing membership data? Upload a CSV of this data to add
                it to Cowmunity!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <label>
                  <span>Upload a file</span>
                  <input type="file" name="file" ref={fileInput} />
                </label>
                <Button
                  className="w-full bg-customAccent text-black"
                  type="submit"
                  onClick={handleUploadFile}
                >
                  Import Data
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/3 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
              <CardDescription>
                Need to export your membership data for use elsewhere? Click
                here to download a CSV of your club's membership data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleClick}
                className="w-full bg-customAccent text-black"
              >
                Export Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between mb-5">
        <div className="w-1/2 ph-2">
          <Input
            placeholder="Filter by name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="shadow-md mr-1"
          />
        </div>
        <div className="w-1/2 ph-2">
          <Input
            placeholder="Filter by UPI..."
            value={(table.getColumn("upi")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn("upi")?.setFilterValue(event.target.value);
            }}
            className="shadow-md ml-1"
          />
        </div>
      </div>
      <div>
        <DataTable table={table} columns={columns} />
      </div>
    </div>
  );
}

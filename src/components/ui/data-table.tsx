import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ColumnDef, Table as T, flexRender } from "@tanstack/react-table";

type TableProps<TData> = {
  table: T<TData>;
  columns: ColumnDef<TData>[];
};

export function DataTable<TData>({ table, columns }: TableProps<TData>) {
  return (
    <div>
      <div className="rounded-md">
        <Table className=" shadow-md">
          <TableHeader className=" shadow-md">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className=" shadow-md" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className=" shadow-md" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="  shadow-md">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={index % 2 === 0 ? "bg-customLight" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="shadow-md" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            className="shadow-md max-w-sm"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            className="shadow-md max-w-sm"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

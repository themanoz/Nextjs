"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export type RepoTableData = {
  id: string;
  full_name: string;
  owner: string;
  labels?: string[];
  // lastChecked: string;
};

export const columns: ColumnDef<RepoTableData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Repository
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">
        <div className="truncate max-w-xs lg:max-w-sm xl:max-w-md">
          {row.getValue("full_name")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "labels",
    header: "Watched Labels",
    cell: ({ row }) => {
      const labels = row.getValue("labels") as string[] | undefined;

      if (!labels || labels.length === 0) {
        return <span className="text-muted-foreground text-sm">No labels</span>;
      }

      const visibleLabels = labels.slice(0, 3);
      const hiddenCount = labels.length - 3;

      return (
        <div className="flex flex-wrap gap-1">
          {visibleLabels.map((label, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`text-xs px-2 py-0.5 ${
                label === "bug" ? "bg-red-100 text-red-800 border-red-200" : ""
              }`}
            >
              {label}
            </Badge>
          ))}
          {hiddenCount > 0 && (
            <Badge
              variant="outline"
              className="text-xs px-2 py-0.5 text-muted-foreground"
            >
              +{hiddenCount} more
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "owner",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Organisation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="truncate max-w-32 lg:max-w-40">
        {row.getValue("owner")}
      </div>
    ),
  },
  // {
  //   accessorKey: "lastChecked",
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       className="h-auto p-0 font-semibold hover:bg-transparent"
  //     >
  //       Last Checked
  //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  //   cell: ({ row }) => {
  //     const value = row.getValue("lastChecked") as string;
  //     const date = value ? new Date(value) : null;
  //     return (
  //       <div className="text-sm text-muted-foreground">
  //         {date
  //           ? date.toLocaleString(undefined, {
  //               year: "numeric",
  //               month: "short",
  //               day: "numeric",
  //               hour: "2-digit",
  //               minute: "2-digit",
  //               second: "2-digit",
  //             })
  //           : "—"}
  //       </div>
  //     );
  //   },
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const repo = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(repo.full_name)}
              className="cursor-pointer"
            >
              Copy repository name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Update labels
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive text-red-500 focus:text-red-500">
              Remove from watchlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface Repo {
  id: string;
  full_name: string;
  name: string;
  owner: string;
  labels?: string[];
  // lastChecked: string;
}

interface RepoProps {
  repos: Repo[];
}

export function DataTableDemo({ repos }: RepoProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const repositories: RepoTableData[] = repos.map((repo) => ({
    id: repo.id,
    full_name: repo.full_name,
    owner: repo.owner,
    labels: repo.labels || [],
    // lastChecked: repo.lastChecked,
  }));

  const table = useReactTable({
    data: repositories,
    columns,
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
    <div className="w-full space-y-4">
      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter repositories..."
            value={
              (table.getColumn("full_name")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("full_name")?.setFilterValue(event.target.value)
            }
            className="pl-10 max-w-sm"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id === "full_name" ? "Repository" : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-background">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="whitespace-nowrap">
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
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4">
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
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="text-muted-foreground">
                        No repositories found
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Start by adding a repository to your watchlist
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
          </div>
          <Button
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

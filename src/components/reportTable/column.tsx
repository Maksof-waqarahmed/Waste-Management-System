"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Reports } from "@prisma/client";
import { Label } from "../ui/label";
import { DropdownMenu, DropdownMenuGroup } from "../ui/dropdown-menu";
import Link from "next/link";
import { DataTableColumnHeader } from "../shared/data-table/table-column-header";

// interface ListReport {
//   total: number;
//   page: number;
//   limit: number;
//   data?: Array<Reports> | null;
// }
export const ReportColumn: ColumnDef<Reports>[] = [
  {
    accessorKey: "collectorID",
    header: ({ column, header }) => (
      <DataTableColumnHeader
        className="uppercase"
        column={column}
        title="Collector ID"
      />
    ),
    cell: ({ row }) => <Label className="text-sm font-medium">{""}</Label>,
  },
  {
    accessorKey: "wasteType",
    header: ({ column, header }) => (
      <DataTableColumnHeader
        className="uppercase"
        column={column}
        title="Waste Type"
      />
    ),
    cell: ({ row }) => <Label className="text-sm font-medium"></Label>,
  },
  {
    accessorKey: "imgURL",
    header: ({ column, header }) => (
      <DataTableColumnHeader
        className="uppercase"
        column={column}
        title="Image URL"
      />
    ),
    cell: ({ row }) => (
      <Label className="text-sm font-medium">
        <a href="">{}</a>
      </Label>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column, header }) => (
      <DataTableColumnHeader
        className="uppercase"
        column={column}
        title="Address"
      />
    ),
    cell: ({ row }) => <Label className="text-sm font-medium"></Label>,
  },
  {
    accessorKey: "date",
    header: ({ column, header }) => (
      <DataTableColumnHeader
        className="uppercase"
        column={column}
        title="Date"
      />
    ),
    cell: ({ row }) => <Label className="text-sm font-medium"></Label>,
  },
  {
    accessorKey: "status",
    header: ({ column, header }) => (
      <DataTableColumnHeader
        className="uppercase"
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => (
      <Label className="text-sm font-medium flex items-center gap-x-1">
        <span className="icon-[carbon--dot-mark] text-green-600"></span>
      </Label>
    ),
  },
];

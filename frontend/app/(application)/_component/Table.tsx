"use client";

import React, { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnDef,
  VisibilityState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, PlusCircleIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Ticket, StatusEnum, PriorityEnum } from "@/schemas/ticketsSchema";

import { useTickets } from "@/hooks/use-tickets";
import { DataTableColumnHeader } from "@/components/table/TableColumnHeader";
import { DeleteDialog } from "./DeleteDialog";
import { DataTableToolbar } from "../../../components/table/TableToolbar";
import { DataTable } from "@/components/table/UserTable";
import {
  Overlay,
  OverlayContent,
  OverlayHeader,
  OverlayTitle,
  OverlayTrigger,
} from "@/components/ui/overlay";
import { DataTableFilter } from "@/components/table/TableFilter";
import { TicketForm } from "./TicketForm";

export default function TicketManagement() {
  const { data: tickets = [] } = useTickets();
  console.log(tickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const columns: ColumnDef<Ticket>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priority" />
      ),
      cell: ({ row }) => {
        const priority = row.original.priority;
        let variant: "default" | "success" | "destructive" | "warning" =
          "default";
        if (priority === PriorityEnum.high) {
          variant = "destructive";
        } else if (priority === PriorityEnum.medium) {
          variant = "warning";
        } else if (priority === PriorityEnum.low) {
          variant = "success";
        }
        console.log(variant);
        return <Badge variant={variant}>{priority}</Badge>;
      },
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        let variant: "default" | "success" | "destructive" | "warning" =
          "default";
        if (status === StatusEnum.open) {
          variant = "warning";
        } else if (status === StatusEnum.inProgress) {
          variant = "default";
        } else if (status === StatusEnum.resolved) {
          variant = "success";
        } else if (status === StatusEnum.closed) {
          variant = "destructive";
        }
        return <Badge variant={variant}>{status}</Badge>;
      },
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => {
        const createdAt = new Date(row.original.createdAt);
        return <span> {createdAt.toLocaleDateString()} </span>;
      },
    },
    {
      accessorKey: "resolvedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Resolved At" />
      ),
      cell: ({ row }) => {
        const createdAt = row.original?.resolvedAt
          ? new Date(row.original.resolvedAt).toLocaleDateString()
          : "";
        return <span> {createdAt} </span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex h-5 items-center justify-end space-x-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => {
              setSelectedTicket(row.original);
              setIsOverlayOpen(true);
            }}
          >
            <Edit className="size-4" />
          </Button>
          {/* Dialog for deleting the ticket */}
          <DeleteDialog row={row} />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: tickets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnVisibility,
      globalFilter: searchTerm,
    },
    onGlobalFilterChange: setSearchTerm,
  });

  return (
    <div className="col-span-full">
      <div>
        <DataTableToolbar
          table={table}
          isOverlayOpen={isOverlayOpen}
          setIsOverlayOpen={setIsOverlayOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          renderFilterContent={() => (
            <>
              <DataTableFilter
                className="w-full sm:w-fit"
                column={table.getColumn("status")}
                title="Status"
                options={[
                  { label: "Open", value: "open" },
                  { label: "Closed", value: "closed" },
                  { label: "In Progress", value: "inProgress" },
                ]}
              />
              <DataTableFilter
                className="w-full sm:w-fit"
                column={table.getColumn("priority")}
                title="Priority"
                options={[
                  { label: "High", value: "high" },
                  { label: "Medium", value: "medium" },
                  { label: "Low", value: "low" },
                ]}
              />
            </>
          )}
          renderOverlayContent={() => (
            <Overlay open={isOverlayOpen} onOpenChange={setIsOverlayOpen}>
              <OverlayTrigger asChild>
                <Button
                  // onClick={() => setSelectedUser(null)}
                  className="h-8 w-full sm:w-fit"
                >
                  <PlusCircleIcon /> Add New User
                </Button>
              </OverlayTrigger>
              <OverlayContent className="md:max-w-[673px]">
                <OverlayHeader>
                  <OverlayTitle>Add New Ticket</OverlayTitle>
                </OverlayHeader>
                <TicketForm setOpen={setIsOverlayOpen} />
              </OverlayContent>
            </Overlay>
          )}
        />
        <DataTable table={table} />
      </div>
    </div>
  );
}

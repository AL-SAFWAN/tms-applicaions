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

import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import UserChart from "./_component/UserChart";
import { DataTableToolbar } from "./_component/TableToolbar";
import { User } from "@/schemas/authSchema";
import { UsersTable } from "./_component/UserTable";
import { DataTableColumnHeader } from "./_component/TableColumnHeader";

import { useUsers } from "@/hooks/users";
import { DeleteDialog } from "./_component/DeleteDialog";
import { DeactivateButton } from "./_component/DeactiveButton";

export default function UserManagement() {
  const { data: user = [] } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  console.log(user);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="First Name" />;
      },
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Last Name" />;
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Email" />;
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },

    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex w-16 text-center font-normal">
          <Badge
            variant={row.original.isActive ? "success" : "destructive"}
            className="h-5"
          >
            {row.original.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id) ? "active" : "inactive");
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex h-5 items-center justify-end space-x-2">
          <DeactivateButton row={row} />
          <Button
            variant="ghost"
            size="xs"
            onClick={() => {
              console.log();
              setSelectedUser(row.original);
              setIsOverlayOpen(true);
            }}
          >
            <Edit className="size-4" />
          </Button>
          <DeleteDialog row={row} />
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data: user,
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
    <div className="container mb-12 flex flex-col space-y-12 px-12">
      <UserChart />
      <div>
        <DataTableToolbar
          table={table}
          isOverlayOpen={isOverlayOpen}
          setIsOverlayOpen={setIsOverlayOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <UsersTable table={table} />
      </div>
    </div>
  );
}

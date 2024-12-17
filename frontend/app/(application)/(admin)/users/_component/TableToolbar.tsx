"use client";

import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { PlusCircle, Search, Settings2, X } from "lucide-react";
import { DataTableFilter } from "../../../../../components/table/TableFilter";
import { Button } from "@/components/ui/button";
import {
  Overlay,
  OverlayContent,
  OverlayTitle,
  OverlayTrigger,
  OverlayHeader,
} from "@/components/ui/overlay";
import { UserForm } from "./UserForm";
import { User } from "@/schemas/authSchema";
import { TableViewOptions } from "../../../../../components/table/TableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsOverlayOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  selectedUser: User | null;
  searchTerm: string;
  isOverlayOpen: boolean;
}

export function DataTableToolbar<TData>({
  table,
  setSearchTerm,
  searchTerm,
  setSelectedUser,
  selectedUser,
  isOverlayOpen,
  setIsOverlayOpen,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex h-fit flex-col flex-wrap items-start justify-between sm:flex-row sm:items-center">
      <div className="flex min-w-full flex-wrap pb-2 sm:min-w-0 sm:space-x-2">
        <div className="relative flex min-w-full items-center pb-2 sm:min-w-0">
          <Search className="absolute left-2 top-4 size-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-7 pl-7"
            divClassName="!h-8 "
          />
        </div>
        <div className="flex min-w-full space-x-2 sm:min-w-0">
          <DataTableFilter
            className="w-full sm:w-fit"
            column={table.getColumn("role")}
            title="Role"
            options={[
              { label: "Requester", value: "requester" },
              { label: "Agent", value: "agent" },
              { label: "Admin", value: "admin" },
            ]}
          />
          <DataTableFilter
            className="w-full sm:w-fit"
            column={table.getColumn("isActive")}
            title="Status"
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
          />
          {isFiltered && (
            <Button
              variant="outline"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2"
            >
              <p className="hidden md:block">Reset</p>
              <X />
            </Button>
          )}
        </div>
      </div>
      <div className="flex min-w-full space-x-2 self-start pb-2 sm:min-w-0">
        <TableViewOptions table={table} className="w-full sm:w-fit" />
        <Overlay open={isOverlayOpen} onOpenChange={setIsOverlayOpen}>
          <OverlayTrigger asChild>
            <Button
              onClick={() => setSelectedUser(null)}
              className="h-8 w-full sm:w-fit"
            >
              <PlusCircle /> Add New User
            </Button>
          </OverlayTrigger>
          <OverlayContent className="md:max-w-[673px]">
            <OverlayHeader>
              <OverlayTitle>
                {selectedUser ? "Edit User" : "Add New User"}
              </OverlayTitle>
            </OverlayHeader>
            <UserForm user={selectedUser} setOpen={setIsOverlayOpen} />
          </OverlayContent>
        </Overlay>
      </div>
    </div>
  );
}

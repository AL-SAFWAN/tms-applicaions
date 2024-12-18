"use client";

import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { PlusCircle, Search, Settings2, X } from "lucide-react";
import { DataTableFilter } from "./TableFilter";
import { Button } from "@/components/ui/button";
import {
  Overlay,
  OverlayContent,
  OverlayTitle,
  OverlayTrigger,
  OverlayHeader,
} from "@/components/ui/overlay";
import { UserForm } from "../../app/(application)/(admin)/users/_component/UserForm";
import { User } from "@/schemas/authSchema";
import { TableViewOptions } from "./TableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsOverlayOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  isOverlayOpen: boolean;
  renderOverlayContent: () => React.ReactNode;
  renderFilterContent: () => React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  setSearchTerm,
  searchTerm,
  renderOverlayContent,
  renderFilterContent,
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
            placeholder="Search ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-7 pl-7"
            divClassName="!h-8 "
          />
        </div>
        <div className="flex min-w-full space-x-2 sm:min-w-0">
          {renderFilterContent()}

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
        {renderOverlayContent()}
      </div>
    </div>
  );
}

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TABLE_CONTROL_STATUS } from "@/types/data";
import { CONTROL } from "@/types/schema";
import { IResponseRO } from "@/lib/services";

import { DataTable } from "./components/data-table";

type ListingProps = {
  columns: ColumnDef<CONTROL, any>[];
  siteId: string;
  options: { statuses: TABLE_CONTROL_STATUS[] };
  getData: <T>({
    siteId,
    pageIndex,
    pageSize
  }: {
    siteId: string;
    pageIndex: number;
    pageSize: number;
  }) => Promise<IResponseRO<T>>;
};

export default function Listing({
  columns,
  options,
  getData,
  siteId
}: ListingProps) {
  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <DataTable
          columns={columns}
          options={options}
          siteId={siteId}
          getData={getData}
        />
      </div>
    </>
  );
}

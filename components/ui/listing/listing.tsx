"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TABLE_CONTROL_STATUS } from "@/types/data";
import { CONTROL } from "@/types/schema";
import { IResponseRO } from "@/lib/services";

import { DataTable } from "./components/data-table";

/* import { z } from "zod" */

type ListingProps = {
  columns: ColumnDef<CONTROL, any>[];
  data?: CONTROL[];
  siteId: string;
  options: { statuses: TABLE_CONTROL_STATUS[] };
  getData: ({
    siteId,
    pageIndex,
    pageSize
  }: {
    siteId: string;
    pageIndex: number;
    pageSize: number;
  }) => Promise<IResponseRO<CONTROL>>;
};

export default function Listing({
  columns,
  data,
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

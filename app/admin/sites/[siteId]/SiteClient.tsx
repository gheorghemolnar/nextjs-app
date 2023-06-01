"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import { CONTROL_RO, PHOTO, SITE } from "@/types/data";
import { CONTROL } from "@/types/schema";
import { IResponseRO } from "@/lib/services";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/listing/components/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/listing/components/data-table-row-actions";
import { statuses } from "@/components/ui/listing/data/data";
import Listing from "@/components/ui/listing/listing";

const URL_BASE = "http://localhost:3000";

type Props = {
  //TODO: TO BE DELETED, ONLY TEMPORARY
  site: SITE;
  controls: CONTROL_RO[];
};

async function getClientControls({
  siteId,
  pageIndex,
  pageSize
}: {
  siteId: string;
  pageIndex: number;
  pageSize: number;
}): Promise<IResponseRO<CONTROL_RO>> {
  const response = await fetch(
    `${URL_BASE}/api/controls/${siteId}?pageIndex=${pageIndex}&pageSize=${pageSize}`
  );
  const result: IResponseRO<CONTROL> = await response.json();

  return result;
}

export const columns: ColumnDef<CONTROL, any>[] = [
  /*
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Tout séléctionner"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélection ligne"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "IdControle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px]">{row.getValue("IdControle")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  */
  {
    accessorKey: "DaHeCont",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const dt = new Date(row.getValue("DaHeCont"));

      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {dt.toLocaleDateString()}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "LibAtelier",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Atelier" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("LibAtelier")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "LibCtrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contrôle" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("LibCtrl")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "ResultCont",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Statut" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("ResultCont")
      );

      if (!status) {
        return null;
      }

      const color = status.color ?? "";
      return (
        <div className="flex w-[120px] items-center">
          {status.icon && <status.icon className={cn("mr-2 h-6 w-6", color)} />}
          <span>{status.label}</span>
        </div>
      );
    },

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    header: () => (
      <div className="flex w-[80px] items-center justify-center">Détails</div>
    ),
    accessorKey: "details",
    cell: ({ row, table }) => {
      const rawPhotos = row.original?.Photos;
      let photos: PHOTO[] | null = null;
      if (rawPhotos) {
        const tableMeta = table.options.meta;
        return (
          <div className="flex justify-center items-center">
            <Button
              className="px-2"
              onClick={() => {
                tableMeta?.setSelectedDialogRowData! &&
                  tableMeta.setSelectedDialogRowData(row.original);
                tableMeta?.showModal! && tableMeta.showModal(true);
              }}
            >
              Détails
            </Button>
          </div>
        );
      }

      return "";
    }
  },
  {
    accessorKey: "CreaQui",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Qui" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {/*  {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("CreaQui")}
          </span>
        </div>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];

export default function SiteClient({ site, controls }: Props) {
  const { siteId } = useParams();

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[1200px] flex-col items-start gap-2">
          <h1 className="text-xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            {site.siteLabel} <br className="hidden sm:inline" />
          </h1>
          <p className="max-w-[700px] text-md text-muted-foreground">
            ID site : {siteId} / Code RH: {site.code_RH} / Code BG:{" "}
            {site.code_BG}
          </p>
        </div>
        <Listing
          siteId={siteId}
          columns={columns}
          data={controls}
          getData={getClientControls}
        />
      </section>
    </>
  );
}

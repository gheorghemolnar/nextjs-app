"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Check, XIcon } from "lucide-react";

import { PHOTO, SITE } from "@/types/data";
import { CONTROL, CONTROL_STATUS } from "@/types/schema";
import { IResponseRO } from "@/lib/services";
import { cn, formatDate, getUrlBase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/listing/components/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/listing/components/data-table-row-actions";
import Listing from "@/components/ui/listing/listing";

const URL_BASE = getUrlBase();

async function getData() {
  console.log("GET DATA >>>>");

  const payload = {
    siteId: "01",
    pageIndex: 0,
    pageSize: 20,
    filters: [
      {
        operand: "EQUALS",
        field: "IDATELIER",
        value: "2"
      }
      /*
      { "NOT_EQUALS", "<>" },
      { "LESS", "<"},
      { "LESS_OR_EQUALS", "<="},
      { "GREATER", ">"},
      { "GREATER_OR_EQUALS", ">="}
      */
    ]
  };
  const response = await getClientControls(payload);
  //const res = await response.json();
  console.log("🚀 RESULT:", response);
}

type Props = {
  //TODO: TO BE DELETED, ONLY TEMPORARY
  site: SITE;
};

async function getClientControls({
  siteId,
  pageIndex,
  pageSize
}: {
  siteId: string;
  pageIndex: number;
  pageSize: number;
}): Promise<IResponseRO<CONTROL>> {
  const response = await fetch(
    `${URL_BASE}/api/controls/${siteId}?pageIndex=${pageIndex}&pageSize=${pageSize}`
  );
  const result: IResponseRO<CONTROL> = await response.json();

  return result;
}

export const statuses = [
  {
    value: CONTROL_STATUS.C,
    label: "Conforme",
    icon: Check,
    color: "text-green-900"
  },
  {
    value: CONTROL_STATUS.NC,
    label: "NonConforme",
    icon: XIcon,
    color: "text-red-900"
  }
];

export const columns: ColumnDef<CONTROL, any>[] = [
  {
    accessorKey: "DaHeCont",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Heure" />
    ),
    cell: ({ row }) => {
      const dt = formatDate(row.getValue("DaHeCont"));

      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">{`${dt}`}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "LibSecteur",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Secteur" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("LibSecteur")}
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
    id: "details",
    header: () => (
      <div className="flex w-[80px] items-center justify-center">Détails</div>
    ),
    cell: ({ row, table }) => {
      const rawPhotos = row.original?.Photos;

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

/* const handle = async () => {
  console.log("HandleCLick Start");

  const data = await getClientControls({
    siteId: "01",
    pageIndex: 0,
    pageSize: 20,
    filters: [
      {
        operand: "EQUALS",
        field: "IDATELIER",
        value: ""
      }
            { "NOT_EQUALS", "<>" },
      { "LESS", "<"},
      { "LESS_OR_EQUALS", "<="},
      { "GREATER", ">"},
      { "GREATER_OR_EQUALS", ">="}
    
    ]
  });
  console.log("🚀 ~ file: SiteClient.tsx:210 ~ handle ~ data:", data);
  console.log("HandleCLick End");
}; */

export default function SiteClient({ site }: Props) {
  const { siteId } = useParams();

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[1200px] flex-col items-start gap-2">
          {/*           <h1 className="text-lg font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-1xl lg:text-2xl">
            {site.siteLabel}
          </h1> */}

          {/*
          <p className="max-w-[700px] text-sm text-muted-foreground">
            ID site : {siteId} / Code RH: {site.code_RH} / Code BG:{" "}
            {site.code_BG}
            &nbsp;
          </p>
          */}
        </div>
        <Listing
          siteId={siteId}
          columns={columns}
          options={{ statuses }}
          getData={getClientControls}
        />
      </section>
    </>
  );
}

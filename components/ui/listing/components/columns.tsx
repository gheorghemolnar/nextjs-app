"use client"

import { ColumnDef } from "@tanstack/react-table"

import { PHOTO, PHOTO_CTRL } from "@/types/data"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { CONTROL } from "../../../../types/schema"
import { CONTROL_STATUS, statuses } from "../data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<CONTROL>[] = [
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
      const dt = new Date(row.getValue("DaHeCont"))

      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {dt.toLocaleDateString()}
          </span>
        </div>
      )
    },
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
      )
    },
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
      )
    },
  },
  {
    accessorKey: "ResultCont",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Statut" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("ResultCont")
      )

      if (!status) {
        return null
      }

      const color = status.color ?? ""
      return (
        <div className="flex w-[120px] items-center">
          {status.icon && <status.icon className={cn("mr-2 h-6 w-6", color)} />}
          <span>{status.label}</span>
        </div>
      )
    },

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    header: () => (
      <div className="flex w-[80px] items-center justify-center">Détails</div>
    ),
    accessorKey: "details",
    cell: ({ row, table }) => {
      const failedControl = row.original?.ResultCont === CONTROL_STATUS.NC

      if (failedControl) {
        console.log(row.original)
        const tableMeta = table.options.meta
        return (
          <div className="flex justify-center items-center">
            <Button
              className="px-2"
              onClick={() => {
                tableMeta?.setSelectedDialogRowData! &&
                  tableMeta.setSelectedDialogRowData(row.original)
                tableMeta?.showModal! && tableMeta.showModal(true)
              }}
            >
              Détails
            </Button>
          </div>
        )
      }

      return ""
    },
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
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

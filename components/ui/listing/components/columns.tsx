"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { Control } from "../../../../types/schema"
import { labels, priorities, statuses } from "../data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Control>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Tout sélectionner"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Séléction ligne"
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
      <div className="w-[60px]">{row.getValue("IdControle")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "LibAtelier",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Atélier" />
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
    accessorKey: "LibSecteur",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Secteur" />
    ),
    cell: ({ row }) => {
      // TODO: Use the Code C/M
      //const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("LibSecteur")}
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
      // TODO: Use the Code C/M
      //const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/*  {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
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

      return (
        <div className="flex w-[120px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  /*   {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  }, */
  {
    accessorKey: "CreaQui",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Qui" />
    ),
    cell: ({ row }) => {
      // TODO: Use the Code C/M
      //const label = labels.find((label) => label.value === row.original.label)

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

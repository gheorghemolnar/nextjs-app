import { CONTROL } from "@/types/schema"
import { IResponseRO } from "@/lib/services"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

/* import { z } from "zod" */

type Props = {
  data: CONTROL[]
  siteId: string
  getData: ({
    siteId,
    pageIndex,
    pageSize,
  }: {
    siteId: string
    pageIndex: number
    pageSize: number
  }) => Promise<IResponseRO<CONTROL>>
}

export default function Listing({ data, getData, siteId }: Props) {
  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Contrôles</h2>
            <p className="text-muted-foreground">Liste de résultats</p>
          </div>
        </div>

        <DataTable
          data={data}
          columns={columns}
          siteId={siteId}
          getData={getData}
        />
      </div>
    </>
  )
}

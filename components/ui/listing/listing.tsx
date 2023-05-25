import { Metadata } from "next"
import Image from "next/image"

import { CONTROL_RO } from "@/types/data"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

/* import { z } from "zod" */
/* import { UserNav } from "./components/user-nav" */
/* import { taskSchema } from "./data/schema" */

export const metadata: Metadata = {
  title: "Contrôles",
  description: "A Control and issue tracker build using Tanstack Table.",
}
/*
// Simulate a database read for tasks.
async function getTasks() {
     const data = await fs.readFile(
    path.join(process.cwd(), "app/examples/tasks/data/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}
*/

type Props = {
  data: CONTROL_RO[]
}

export default function Listing({ data }: Props) {
  /*  const tasks = await getTasks() */

  return (
    <>
      <div className="md:hidden">
        {/*         <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        /> */}
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Contrôles</h2>
            <p className="text-muted-foreground">Liste de résultats</p>
          </div>
          <div className="flex items-center space-x-2">
            UserNav
            {/*     <UserNav /> */}
          </div>
        </div>
        <DataTable data={data} columns={columns} />
      </div>
    </>
  )
}

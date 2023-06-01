import { NextResponse } from "next/server"

import { CONTROL } from "@/types/schema"
import { IResponseRO } from "@/lib/services/clientSoap"
import getControls from "@/app/actions/getControls"

export async function GET(
  request: Request,
  { params: { siteId } }: { params: { siteId: string } }
) {
  const { searchParams } = ({} = new URL(request.url))

  console.log("🚀 DEBUG > GET > searchParams > ", searchParams)

  const newSearchParams = {
    pageIndex: Number(searchParams.get("pageIndex")),
    pageSize: Number(searchParams.get("pageSize")),
  }

  const newParams = { siteId, ...newSearchParams }
  console.log("🚀 DEBUG > GET > newParams:", newParams)

  let result: IResponseRO<CONTROL> = await getControls(newParams)

  return NextResponse.json(result)
}

import { NextResponse } from "next/server";

import "@/types/schema";
import { COMPANY_RO } from "@/types/data";
import { IResponseRO } from "@/lib/services/clientSoap";
import { getCompanies } from "@/app/actions/companies";

export async function GET(request: Request) {
  const { searchParams } = ({} = new URL(request.url));

  console.log("🚀 DEBUG > GET > searchParams > ", searchParams);

  const newSearchParams = {
    pageIndex: Number(searchParams.get("pageIndex")),
    pageSize: Number(searchParams.get("pageSize"))
  };

  const newParams = { ...newSearchParams };
  console.log("🚀 DEBUG > GET > newParams:", newParams);

  let result: IResponseRO<COMPANY_RO> = await getCompanies(newParams);

  return NextResponse.json(result);
}

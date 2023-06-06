import { COMPANY_DTO, COMPANY_RO } from "@/types/data";
import { CONTROL } from "@/types/schema";
import { IResponseRO, dataWrapper } from "@/lib/services";

export async function getCompanies({
  pageIndex,
  pageSize
}: {
  pageIndex: number;
  pageSize: number;
}): Promise<IResponseRO<COMPANY_RO>> {
  const payload: COMPANY_DTO = {
    table: "SOCIETE",
    version: "1",
    pageNumber: pageIndex,
    pageSize: pageSize
  };

  try {
    const data = await dataWrapper.get.companies(payload);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

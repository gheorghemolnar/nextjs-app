import { CONTROL_DTO } from "@/types/data";
import { CONTROL } from "@/types/schema";
import { IResponseRO, dataWrapper } from "@/lib/services";

export default async function getControls({
  siteId,
  pageIndex,
  pageSize
}: {
  siteId: string;
  pageIndex: number;
  pageSize: number;
}): Promise<IResponseRO<CONTROL>> {
  const payload: CONTROL_DTO = {
    table: "CONTROLE",
    version: "1",
    company: "",
    site: siteId,
    pageNumber: pageIndex,
    pageSize: pageSize
  };

  try {
    const data = await dataWrapper.get.controls(payload);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

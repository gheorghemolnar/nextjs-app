import { CONTROL_DTO } from "@/types/data"
import { dataWrapper } from "@/lib/services"

export default async function getControls() {
  const payload: CONTROL_DTO = {
    version: "1",
    table: "CONTROLE",
    company: "",
    site: "01",
    pageNumber: 1,
    pageSize: 10,
  }

  try {
    const data = await dataWrapper.get.controls(payload)

    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

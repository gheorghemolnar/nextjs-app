import { SITE_DTO } from "@/types/data"
import { dataWrapper } from "@/lib/services"

export default async function getSites() {
  const payload: SITE_DTO = {
    version: "1",
    table: "SITE",
    company: "",
    site: "",
  }

  try {
    const data = await dataWrapper.get.sites(payload)

    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

import { sleep } from ".."
import { SITE_RO } from "@big/types"


const atelierList:SITE_RO[] = [{}]
export async function getSites(): Promise<SITE_RO[]> {
    await sleep()
    return sitesList

}
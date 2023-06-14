import { sleep } from ".."
import { ATELIER_RO } from "@big/types"

const atelierList:ATELIER_RO[] = [{}]
export async function getAteliers():Promise<ATELIER_RO[]> {
    await sleep()
    return atelierList

}
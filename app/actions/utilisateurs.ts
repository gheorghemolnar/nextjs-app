import { USERS_DTO, USER_DTO } from "@/types/data";
import { USER } from "@/types/schema";
import { IResponseRO, dataWrapper } from "@/lib/services";

/**
 * POST
 * @returns
 */
export async function createUser(data: USER): Promise<IResponseRO> {
  const payload: USER_DTO = {
    version: "1",
    table: "UTILISAT",
    company: "",
    payload: data
  };

  try {
    const data = await dataWrapper.post.createUser(payload);
    console.log("🚀 ~ file: users.ts:14 ~ createUser ~ data:", data);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
/**
 * GET
 * @returns
 */
export async function getUsers(): Promise<IResponseRO<USER>> {
  const payload: USERS_DTO = {
    version: "1",
    table: "UTILISAT",
    company: "",
    site: ""
  };

  try {
    const data = await dataWrapper.get.users(payload);
    console.log("🚀 API > GET > getUsers Data:", data);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

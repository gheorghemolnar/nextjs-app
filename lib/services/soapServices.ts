import {
  COMPANY_DTO,
  COMPANY_RO,
  CONTROL_DTO,
  SITE_DTO,
  SITE_RO,
  USERS_DTO,
  USER_DTO,
  USER_FILE_DTO,
  USER_FILE_RO
} from "@/types/data";
import { CONTROL, USER } from "@/types/schema";

import {
  IResponseRO,
  createData,
  getTableDataBase,
  getTableDataBasePagination,
  getUserFiles
} from "./clientSoap";

export const dataWrapper = {
  get: {
    userFiles: async (
      payload: USER_FILE_DTO
    ): Promise<IResponseRO<USER_FILE_RO>> => await getUserFiles(payload),
    sites: async (payload: SITE_DTO): Promise<IResponseRO<SITE_RO>> =>
      //await getTableDataBasePagination(payload),
      await getTableDataBase(payload),
    companies: async (payload: COMPANY_DTO): Promise<IResponseRO<COMPANY_RO>> =>
      await getTableDataBasePagination(payload),
    controls: async (payload: CONTROL_DTO): Promise<IResponseRO<CONTROL>> =>
      await getTableDataBasePagination<CONTROL>(payload),
    users: async (payload: USERS_DTO): Promise<IResponseRO<USER>> =>
      await getTableDataBasePagination(payload)
  },
  post: {
    createUser: async (payload: USER_DTO): Promise<IResponseRO> =>
      await createData<undefined>(payload)
  }
};

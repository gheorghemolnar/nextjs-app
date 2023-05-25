import {
  COMPANY_DTO,
  COMPANY_RO,
  CONTROL_DTO,
  CONTROL_RO,
  CREATE_SITE_DTO,
  SITE_DTO,
  SITE_RO,
  USER_FILE_DTO,
  USER_FILE_RO,
} from "@/types/data"

import {
  IResponseRO,
  createData,
  getTableDataBase,
  getTableDataBasePagination,
  getUserFiles,
} from "./clientSoap"

export const dataWrapper = {
  get: {
    userFiles: async (
      payload: USER_FILE_DTO
    ): Promise<IResponseRO<USER_FILE_RO>> => await getUserFiles(payload),
    sites: async (payload: SITE_DTO): Promise<IResponseRO<SITE_RO>> =>
      await getTableDataBase(payload),
    companies: async (payload: COMPANY_DTO): Promise<IResponseRO<COMPANY_RO>> =>
      await getTableDataBase(payload),
    // controls: async (payload: CONTROL_DTO): Promise<IResponseRO<CONTROL_RO>> =>
    //   await getTableDataBase(payload),
    controls: async (payload: CONTROL_DTO): Promise<IResponseRO<CONTROL_RO>> =>
      await getTableDataBasePagination(payload),
  },
  post: {
    createUser: async (payload: CREATE_SITE_DTO) => await createData(payload),
  },
}

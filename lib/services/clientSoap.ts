import * as soap from "soap"

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

export interface IResponseRO<T> {
  status: string
  errorMessage: string
  data?: T[]
}

export type REQUEST = SITE_DTO

const SERVER =
  process?.env?.WS_SERVER === "" ? "localhost" : process.env.WS_SERVER
const PORT = process?.env?.WS_PORT ?? 44368
const URL = `http://${SERVER}:${PORT}/ServiceBigExploit.svc?wsdl`

const WS_USER = process?.env?.WS_USER
const WS_PASSWORD = process?.env?.WS_PASSWORD

console.log("🚀 > URL:", URL)

export interface IClientData {
  client: soap.Client
  /*   getUserFiles: (payload: USER_FILE_DTO) => Promise<IResponseRO<USER_FILE_RO>>;
  getTableDataBase: (payload: REQUEST) => Promise<IResponseRO<any>>; */
}

let clientSoap: soap.Client

let clientWrapper: IClientData | null = null

const SoapClient = async () => {
  console.log("🚀 >>>>> URL >>>>>>>", URL)

  if (!(WS_USER || WS_PASSWORD)) {
    throw new Error("Config: Variables missing !")
  }

  if (!clientWrapper && WS_USER && WS_PASSWORD) {
    clientSoap = await soap.createClientAsync(URL)
    clientSoap.setSecurity(new soap.BasicAuthSecurity(WS_USER, WS_PASSWORD))
  }
  clientWrapper = {
    client: clientSoap,
  }

  return clientWrapper
}

export const getUserFiles = async (
  payload: SITE_DTO
): Promise<IResponseRO<USER_FILE_RO>> => {
  if (!clientSoap) {
    await SoapClient()
  }

  const [
    {
      Get_BUPOSTEPDF_V1Result: {
        listOfBuPostePdf: { BuPostePdf: data },
        returnMessage,
        status,
      },
    },
  ] = await clientSoap.Get_BUPOSTEPDF_V1Async(payload)

  return { status, data, errorMessage: returnMessage }
}

// TODO: A GARDER ???
export const getTableDataBase = async (
  payload: REQUEST
): Promise<IResponseRO<any>> => {
  if (!clientSoap) {
    await SoapClient()
  }

  const [
    {
      Get_Table_Admin_V1Result: {
        listObjects: { Table: data },
        returnMessage,
        status,
      },
    },
  ] = await clientSoap.Get_Table_Admin_V1Async(payload)

  return { status, data, errorMessage: returnMessage }
}

// Get_Table_Admin_Pagination_V1(int version, string table, string company, string site, int pageNumber, int pageSize
// TODO: check if NO RESULTS !!
export const getTableDataBasePagination = async (
  payload: REQUEST
): Promise<IResponseRO<any>> => {
  if (!clientSoap) {
    await SoapClient()
  }

  const [
    {
      Get_Table_Admin_Pagination_V1Result: {
        listObjects: { Table: data },
        returnMessage,
        numberOfRecords,
        status,
      },
    },
  ] = await clientSoap.Get_Table_Admin_Pagination_V1Async(payload)
  return { status, data, errorMessage: returnMessage }

  // const [tmp] = await clientSoap.Get_Table_Admin_Pagination_V1Async(payload)

  return { status, data, errorMessage: returnMessage }
}

export const createData = async (
  params: CREATE_SITE_DTO
): Promise<IResponseRO<any>> => {
  console.log("🚀 createData >>>>>>>>>>>> ~ params:", params)

  if (!clientSoap) {
    await SoapClient()
  }

  //  obj: any, name: string, nsPrefix: any, nsURI: string

  const { version, table, payload } = params
  console.log("🚀 ~ file: clientSoap.ts:115 ~ version:", version)
  console.log("🚀 ~ file: clientSoap.ts:115 ~ table:", table)
  console.log("🚀 ~ file: clientSoap.ts:115 ~ payload:", payload)

  /*   let Table = class {
    CodeSiteBg = "";
    CodeSiteRh = "";
    LibSite = "";
    CreaQui = "";
    OrdreAff = 0;
    IdSociete = 0;

    constructor(
      CodeSiteBg: string,
      CodeSiteRh: string,
      LibSite: string,
      CreaQui: string,
      OrdreAff: number,
      IdSociete: number
    ) {
      this.CodeSiteBg = CodeSiteBg;
      this.CodeSiteRh = CodeSiteRh;
      this.LibSite = LibSite;
      this.CreaQui = CreaQui;
      this.OrdreAff = OrdreAff;
      this.IdSociete = IdSociete;
    }
  };

  const obj = new Table("77", "007", "Bond", "gmo", 0, 99);
  console.log("SITEEE > CLASS ", obj);
  */

  const [
    {
      Insert_Data_Admin_V1Result: { returnMessage, status },
    },
  ] = await clientSoap.Insert_Data_Admin_V1Async({
    version,
    table,
    unObj: JSON.stringify(payload),
  })

  /*
  const [
    {
      Insert_Data_Admin_V1Result: { returnMessage, status },
    },
  ] = await clientSoap.Insert_Data_Admin_V1Async(version, table, payload); */

  return { status, errorMessage: returnMessage }
}

import * as soap from "soap";

import {
  CREATE_SITE_DTO,
  SITE_DTO,
  USERS_DTO,
  USER_DTO,
  USER_FILE_RO
} from "@/types/data";

export interface IResponseRO<T = undefined> {
  status: string;
  errorMessage: string;
  numberOfRecords?: number;
  data?: T extends undefined ? never : T[];
}

export type REQUEST_CREATE = SITE_DTO | USER_DTO;
export type REQUEST_GET = USERS_DTO;

const SERVER =
  process?.env?.WS_SERVER === "" ? "localhost" : process.env.WS_SERVER;
const PORT = process?.env?.WS_PORT ? ":" + process?.env?.WS_PORT : "";
const WS_CONTEXT_PATH = process?.env?.WS_CONTEXT_PATH;

const URL = `http://${SERVER}${PORT}/${WS_CONTEXT_PATH}/ServiceBigExploit.svc?wsdl`;

const WS_USER = process?.env?.WS_USER;
const WS_PASSWORD = process?.env?.WS_PASSWORD;

export interface IClientData {
  client: soap.Client;
}

let clientSoap: soap.Client;

let clientWrapper: IClientData | null = null;

const SoapClient = async () => {
  console.log("🚀 DEBUG >>>>> URL >>>>>>>", URL);

  if (!(WS_USER || WS_PASSWORD)) {
    throw new Error("Config: Variables missing !");
  }

  if (!clientWrapper && WS_USER && WS_PASSWORD) {
    clientSoap = await soap.createClientAsync(URL);
    clientSoap.setSecurity(new soap.BasicAuthSecurity(WS_USER, WS_PASSWORD));
  }
  clientWrapper = {
    client: clientSoap
  };

  return clientWrapper;
};

export const getUserFiles = async (
  payload: SITE_DTO
): Promise<IResponseRO<USER_FILE_RO>> => {
  if (!clientSoap) {
    await SoapClient();
  }

  const [
    {
      Get_BUPOSTEPDF_V1Result: {
        listOfBuPostePdf: { BuPostePdf: data },
        returnMessage,
        status
      }
    }
  ] = await clientSoap.Get_BUPOSTEPDF_V1Async(payload);

  return { status, data, errorMessage: returnMessage };
};

// TODO: A GARDER ???
export async function getTableDataBase<T = undefined>(
  payload: REQUEST_CREATE
): Promise<IResponseRO<T>> {
  if (!clientSoap) {
    await SoapClient();
  }

  const [
    {
      Get_Table_Admin_V1Result: {
        listObjects: { Table: data },
        returnMessage,
        status
      }
    }
  ] = await clientSoap.Get_Table_Admin_V1Async(payload);

  return { status, data, errorMessage: returnMessage };
}
// Get_Table_Admin_Pagination_V1(int version, string table, string company, string site, int pageNumber, int pageSize
// TODO: check if NO RESULTS !!
export async function getTableDataBasePagination<T = undefined>(
  payload: REQUEST_GET
): Promise<IResponseRO<T>> {
  console.log("🚀 CLIENT_SOAP >", payload);

  if (!clientSoap) {
    await SoapClient();
  }

  const [{ Get_Table_Admin_Pagination_V1Result }, , , rawRequest] =
    await clientSoap.Get_Table_Admin_Pagination_V1Async(payload);

  const {
    listObjects: { Table: data },
    returnMessage,
    numberOfRecords,
    status
  } = {
    ...Get_Table_Admin_Pagination_V1Result,
    listObjects: Get_Table_Admin_Pagination_V1Result?.listObjects || {
      Table: []
    },
    returnMessage: Get_Table_Admin_Pagination_V1Result?.returnMessage || "",
    numberOfRecords: Get_Table_Admin_Pagination_V1Result?.numberOfRecords || 0,
    status: Get_Table_Admin_Pagination_V1Result?.status || ""
  };

  return { status, data, numberOfRecords, errorMessage: returnMessage };
}

export async function createData<T = undefined>(
  params: REQUEST_CREATE
): Promise<IResponseRO<T>> {
  console.log("🚀 createData >>>>>>>>>>>> ~ params:", params);

  if (!clientSoap) {
    await SoapClient();
  }

  const { version, table, payload } = params;

  const [
    {
      Insert_Data_Admin_V1Result: { returnMessage, status }
    }
  ] = await clientSoap.Insert_Data_Admin_V1Async({
    version,
    table,
    payload: JSON.stringify(payload)
  });

  return { status, errorMessage: returnMessage };
}

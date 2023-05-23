import soap from 'soap';

import { SITE_DTO, SITE_RO, USER_FILE_RO, USER_FILE_DTO } from '@/types';

export interface IResponseRO<T> {
  status: string;
  errorMessage: string;
  data: T[];
}

export interface IClientData {
  client: soap.Client;
  getUserFiles: (payload: USER_FILE_DTO) => Promise<IResponseRO<USER_FILE_RO>>;
  getTableDataBase: (payload: REQUEST) => Promise<IResponseRO<any>>;
}

export type REQUEST = SITE_DTO;

let clientSoap: soap.Client;

let clientWrapper: IClientData | null = null;

const SoapClient = async () => {
  const SERVER =
    process?.env?.WS_SERVER === '' ? 'localhost' : process.env.WS_SERVER;
  const PORT = process?.env?.WS_PORT ?? 44368;
  const URL = `http://${SERVER}:${PORT}/ServiceBigExploit.svc?wsdl`;

  console.log('🚀 >>>>> URL >>>>>>>', URL);

  if (!process?.env?.WS_USER || !process?.env?.WS_PASSWORD) {
    throw new Error('Config: Variables missing !');
  }

  if (!clientWrapper) {
    clientSoap = await soap.createClientAsync(URL);
    clientSoap.setSecurity(
      new soap.BasicAuthSecurity(process.env.WS_USER, process.env.WS_PASSWORD)
    );
  }
  clientWrapper = {
    client: clientSoap,
    getUserFiles: getUserFiles,
    getTableDataBase: getTableDataBase
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

export const getTableDataBase = async (
  payload: REQUEST
): Promise<IResponseRO<any>> => {
  if (!clientSoap) {
    await SoapClient();
  }
  console.log('clientSoap >>>>>>>>>>>>>>>>>>>>>', clientSoap);

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
};

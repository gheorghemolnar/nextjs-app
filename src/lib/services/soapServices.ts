import { getUserFiles, getTableDataBase, IResponseRO } from './clientSoap';
import {
  COMPANY_DTO,
  COMPANY_RO,
  CONTROL_DTO,
  CONTROL_RO,
  SITE_DTO,
  SITE_RO,
  USER_FILE_DTO,
  USER_FILE_RO
} from '@/types';

export const getUserFilesList = async (
  payload: USER_FILE_DTO
): Promise<IResponseRO<USER_FILE_RO>> => {
  const result = await getUserFiles(payload);

  return result;
};

export const getSitesList = async (
  payload: SITE_DTO
): Promise<IResponseRO<SITE_RO>> => {
  const result = await getTableDataBase(payload);
  console.log('🚀 ~ file: soapServices.ts:9 ~ result:', result);

  return result;
};

export const getCompaniesList = async (
  payload: COMPANY_DTO
): Promise<IResponseRO<COMPANY_RO>> => {
  const result = await getTableDataBase(payload);
  console.log('🚀 ~ file: soapServices.ts:9 ~ result:', result);

  return result;
};

export const getControlsList = async (
  payload: CONTROL_DTO
): Promise<IResponseRO<CONTROL_RO>> => {
  const result = await getTableDataBase(payload);
  console.log('🚀 ~ file: soapServices.ts:9 ~ result:', result);

  return result;
};

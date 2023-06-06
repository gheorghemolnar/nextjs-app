import { LucideIcon } from "lucide-react";
import { z } from "zod";

import {
  CONTROL_STATUS,
  USER,
  controlSchema,
  photoControlSchema,
  photoSchema
} from "./schema";

type BASE_DTO = {
  version: string;
  table: string;
};

export type USER_FILE_DTO = BASE_DTO & {
  company: string;
  site: string;
};

export type USER_FILE_RO = {
  IdBuPostePdf: string;
  LibPoste: string;
  Revision: string;
  CdDep: string;
  CdEts: string;
  CdSec: string;
  CdSoc: string;
  DateHeureCre: string;
  DocPdf: Uint8Array[];
};

export type SITE_DTO = BASE_DTO & { company: string; site: string };

export type SITE_RO = {
  IdSite: number;
  CodeSiteBg: string;
  CodeSiteRh: string;
  LibSite: string;
  OrdreAff: number;
  IdSociete: number;
};

export type COMPANY_DTO = BASE_DTO & {
  company: string;
  site: string;
  pageNumber: number;
  pageSize: number;
};

export type COMPANY_RO = {
  IdSociete: number;
  LibSociete: string;
  OrdreAff: number;
};

export type CONTROL_DTO = BASE_DTO & {
  company: string;
  site: string;
  pageNumber: number;
  pageSize: number;
};

export type CONTROL = z.infer<typeof controlSchema>;
export type PHOTO_CTRL = z.infer<typeof photoControlSchema>;
export type PHOTO = z.infer<typeof photoSchema>;

export type CREATE_SITE_DTO = BASE_DTO & {
  company: string;
  payload: {
    CodeSiteBg: string;
    CodeSiteRh: string;
    LibSite: string;
    CreaQui: string;
    OrdreAff: number;
    IdSociete: number;
  };
};

export type USERS_DTO = BASE_DTO;

export type USER_DTO = BASE_DTO & {
  payload: USER;
};

export type ATELIER = {
  [K in CONTROL_STATUS]: number;
} & {
  id: number;
  label: string;
};

export type SECTOR = {
  [K in CONTROL_STATUS]: number;
} & {
  count: number;
  label: string;
  ateliers: ATELIER[];
};

export interface SECTORS {
  [k: string]: SECTOR;
}

export interface TABLE_CONTROL_STATUS {
  value: CONTROL_STATUS;
  label: string;
  icon: LucideIcon;
  color: string;
}

// TODO: Temporary FIX, TO BE DELETED !!!
export type SITE = {
  siteId: number;
  siteLabel: string;
  code_BG: string;
  code_RH: string;
};

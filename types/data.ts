import { z } from "zod";

import { controlSchema, photoControlSchema, photoSchema } from "./schema";

export type USER_FILE_DTO = {
  version: string;
  company: string;
  site: string;
  table: string;
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

export type SITE_DTO = {
  version: string;
  table: string;
  company: string;
  site: string;
};

export type SITE_RO = {
  IdSite: number;
  CodeSiteBg: string;
  CodeSiteRh: string;
  LibSite: string;
  OrdreAff: number;
  IdSociete: number;
};

export type COMPANY_DTO = {
  version: string;
  table: string;
  company: string;
  site: string;
};

export type COMPANY_RO = {
  IdSociete: number;
  LibSociete: string;
  OrdreAff: number;
};

export type CONTROL_DTO = {
  version: string;
  table: string;
  company: string;
  site: string;
  pageNumber: number;
  pageSize: number;
};

export type CONTROL_RO = z.infer<typeof controlSchema>;
export type PHOTO_CTRL = z.infer<typeof photoControlSchema>;
export type PHOTO = z.infer<typeof photoSchema>;

export type CREATE_SITE_DTO = {
  version: number;
  table: string;
  payload: {
    CodeSiteBg: string;
    CodeSiteRh: string;
    LibSite: string;
    CreaQui: string;
    OrdreAff: number;
    IdSociete: number;
  };
};

export type CREATE_RO = {
  IdSociete: number;
  LibSociete: string;
  OrdreAff: number;
};

// TODO: Temporary FIX, TO BE DELETED !!!
export type SITE = {
  siteId: number;
  siteLabel: string;
  code_BG: string;
  code_RH: string;
};

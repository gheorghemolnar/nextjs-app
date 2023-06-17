import { PartialTypeForEdit, PartialType } from ".";

export interface UTILISATEUR {
  id: number;
  codeutil: string;
  idprofil: number;
  matricule: number;
  nomutil: string;
  preutil: string;
  mdputil: string;
  creaqui: string;
  modifqui: string;
  annuqui: string;
}

// Edit 
export type UTILISATEUR_EDIT = PartialTypeForEdit<UTILISATEUR>

// Create
export type UTILISATEUR_CREATE = Omit<PartialType<UTILISATEUR>, "id"> & {
  codeutil: string;
  idprofil: number;
  matricule: number;
  nomutil: string;
  preutil: string;
  mdputil: string;
  creaqui: string;
}

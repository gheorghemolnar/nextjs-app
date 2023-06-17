import { PartialTypeForEdit, PartialType } from ".";

export interface PARAMSITE {
  id: number;
  idsite: number;
  idatelier: number;
  idsecteur: number;
  creaqui: string;
  modifqui: string;
  annuqui: string;
}


// Edit 
export type PARAMSITE_EDIT = PartialTypeForEdit<PARAMSITE>

// Create
export type PARAMSITE_CREATE = Omit<PartialType<PARAMSITE>, "id"> & {
  idsite: number;
  idatelier: number;
  idsecteur: number;
  creaqui: string;
}

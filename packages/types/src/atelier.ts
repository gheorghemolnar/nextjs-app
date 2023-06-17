import { PartialTypeForEdit, PartialType } from ".";

export interface ATELIER {
  id: number;
  codeatelier: string;
  libatelier: string;
  creaqui: string;
  modifqui: string;
  annuqui: string;
  ordreaff: number;
}

// Edit 
export type ATELIER_EDIT = PartialTypeForEdit<ATELIER>

// Create
export type ATELIER_CREATE = Omit<PartialType<ATELIER>, "id"> & {
  codeatelier: string;
  libatelier: string;
  creaqui: string;
}

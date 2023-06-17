import { PartialTypeForEdit, PartialType } from ".";

export interface SOCIETE {
  ordreaff: number;
  modifqui: string;
  libsociete: string;
  idsociete: number;
  creaqui: string;
  codesociete: string;
  annuqui: string;
};


// Edit 
export type SOCIETE_EDIT = PartialTypeForEdit<SOCIETE>

// Create
export type SOCIETE_CREATE = Omit<PartialType<SOCIETE>, "id"> & {
  codegrillegr: string;
  typegrille: string;
  libctrl: string;
  descctrl: string;
  creaqui: string;
}

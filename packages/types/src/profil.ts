import { PartialType, PartialTypeForEdit } from '.';

export interface PROFIL {
    id: number;
    codeprofil: string;
    libprofil: string;
    creaqui: string;
    modifqui: string;
    annuqui: string;
    ordreaff: number;
}

// Edit
export type PROFIL_EDIT = PartialTypeForEdit<PROFIL>;

// Create
export type PROFIL_CREATE = Omit<PartialType<PROFIL>, 'id'> & {
    codegrillegr: string;
    typegrille: string;
    libctrl: string;
    descctrl: string;
    creaqui: string;
};

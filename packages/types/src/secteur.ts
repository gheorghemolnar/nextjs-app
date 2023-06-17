import { PartialType, PartialTypeForEdit } from '.';

export interface SECTEUR {
    id: number;
    codesecteur: string;
    libsecteur: string;
    creaqui: string;
    modifqui: string;
    annuqui: string;
    ordreaff: number;
}

// Edit
export type SECTEUR_EDIT = PartialTypeForEdit<SECTEUR>;

// Create
export type SECTEUR_CREATE = Omit<PartialType<SECTEUR>, 'id'> & {
    codesecteur: string;
    libsecteur: string;
    creaqui: string;
};

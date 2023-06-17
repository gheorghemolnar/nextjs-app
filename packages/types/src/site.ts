import { PartialType, PartialTypeForEdit } from '.';

export interface SITE {
    id: number;
    codesitebg: string;
    codesiterh: string;
    libsite: string;
    idsociete: number;
    creaqui: string;
    modifqui: string;
    annuqui: string;
    ordreaff: number;
}

// Edit
export type SITE_EDIT = PartialTypeForEdit<SITE>;

// Create
export type SITE_CREATE = Omit<PartialType<SITE>, 'id'> & {
    codesitebg: string;
    codesiterh: string;
    libsite: string;
    idsociete: number;
    creaqui: string;
};

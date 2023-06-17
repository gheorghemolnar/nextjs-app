import { PartialType, PartialTypeForEdit } from '.';

export interface GRILLE_GROUPE {
    id: number;
    codegrillegr: string;
    typegrille: string;
    libctrl: string;
    descctrl: string;
    creaqui: string;
    modifqui: string;
    annuqui: string;
}

// Edit
export type GRILLE_GROUPE_EDIT = PartialTypeForEdit<GRILLE_GROUPE>;

// Create
export type GRILLE_GROUPE_CREATE = Omit<PartialType<GRILLE_GROUPE>, 'id'> & {
    codegrillegr: string;
    typegrille: string;
    libctrl: string;
    descctrl: string;
    creaqui: string;
};

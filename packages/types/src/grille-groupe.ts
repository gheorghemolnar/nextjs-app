import z from 'zod';

import {
    Schema_Grille_Groupe_Create_DTO,
    Schema_Grille_Groupe_Edit_DTO,
    Schema_Grille_Groupe_RO
} from '@big/validators';

export type GRILLE_GROUPE = z.infer<typeof Schema_Grille_Groupe_RO>;
export type GRILLE_GROUPE_EDIT = z.infer<typeof Schema_Grille_Groupe_Edit_DTO>;
export type GRILLE_GROUPE_CREATE = z.infer<
    typeof Schema_Grille_Groupe_Create_DTO
>;

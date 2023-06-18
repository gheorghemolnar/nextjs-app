import z from 'zod';

import {
    Schema_Utilisateur_Create_DTO,
    Schema_Utilisateur_Edit_DTO,
    Schema_Utilisateur_RO,
} from '@big/validators';

export type UTILISATEUR = z.infer<typeof Schema_Utilisateur_RO>;
export type UTILISATEUR_EDIT = z.infer<typeof Schema_Utilisateur_Edit_DTO>;
export type UTILISATEUR_CREATE = z.infer<typeof Schema_Utilisateur_Create_DTO>;

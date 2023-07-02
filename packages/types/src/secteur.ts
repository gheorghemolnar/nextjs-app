import z from 'zod';

import {
    Schema_Secteur_Create_DTO,
    Schema_Secteur_Edit_DTO,
    Schema_Secteur_RO
} from '@big/validators';

export type SECTEUR = z.infer<typeof Schema_Secteur_RO>;
export type SECTEUR_EDIT = z.infer<typeof Schema_Secteur_Edit_DTO>;
export type SECTEUR_CREATE = z.infer<typeof Schema_Secteur_Create_DTO>;

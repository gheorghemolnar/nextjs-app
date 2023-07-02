import z from 'zod';

import {
    Schema_Societe_Create_DTO,
    Schema_Societe_Edit_DTO,
    Schema_Societe_RO
} from '@big/validators';

export type SOCIETE = z.infer<typeof Schema_Societe_RO>;
export type SOCIETE_EDIT = z.infer<typeof Schema_Societe_Edit_DTO>;
export type SOCIETE_CREATE = z.infer<typeof Schema_Societe_Create_DTO>;

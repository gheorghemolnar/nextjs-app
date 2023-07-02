import z from 'zod';

import {
    Schema_Profil_Create_DTO,
    Schema_Profil_Edit_DTO,
    Schema_Profil_RO
} from '@big/validators';

export type PROFIL = z.infer<typeof Schema_Profil_RO>;
export type PROFIL_EDIT = z.infer<typeof Schema_Profil_Edit_DTO>;
export type PROFIL_CREATE = z.infer<typeof Schema_Profil_Create_DTO>;

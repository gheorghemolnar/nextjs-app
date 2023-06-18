import z from 'zod';

import {
    Schema_Atelier_Create_DTO,
    Schema_Atelier_Edit_DTO,
    Schema_Atelier_RO,
} from '@big/validators';

export type ATELIER = z.infer<typeof Schema_Atelier_RO>;
export type ATELIER_EDIT = z.infer<typeof Schema_Atelier_Edit_DTO>;
export type ATELIER_CREATE = z.infer<typeof Schema_Atelier_Create_DTO>;

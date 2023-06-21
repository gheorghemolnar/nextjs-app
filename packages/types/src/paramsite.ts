import z from 'zod';

import {
    Schema_Paramsite_Create_DTO,
    Schema_Paramsite_Edit_DTO,
    Schema_Paramsite_RO
} from '@big/validators';

export type PARAMSITE = z.infer<typeof Schema_Paramsite_RO>;
export type PARAMSITE_EDIT = z.infer<typeof Schema_Paramsite_Edit_DTO>;
export type PARAMSITE_CREATE = z.infer<typeof Schema_Paramsite_Create_DTO>;

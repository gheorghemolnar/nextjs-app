import z from 'zod';

import {
    Schema_Site_Create_DTO,
    Schema_Site_Edit_DTO,
    Schema_Site_RO,
} from '@big/validators';

export type SITE = z.infer<typeof Schema_Site_RO>;
export type SITE_EDIT = z.infer<typeof Schema_Site_Edit_DTO>;
export type SITE_CREATE = z.infer<typeof Schema_Site_Create_DTO>;

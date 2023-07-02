import z from 'zod';

import {
    Schema_Login_Create_DTO,
    Schema_Login_RO
} from '@big/validators';

export type LOGIN = z.infer<typeof Schema_Login_RO>;
export type LOGIN_CREATE = z.infer<typeof Schema_Login_Create_DTO>;

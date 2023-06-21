import z from 'zod';

import {
    Schema_Control_Edit_DTO,
    Schema_Control_RO,
    Schema_Control_Status
} from '@big/validators';

export type CONTROL = z.infer<typeof Schema_Control_RO>;
export type CONTROL_EDIT = z.infer<typeof Schema_Control_Edit_DTO>;

export type CONTROL_STATUS = z.infer<typeof Schema_Control_Status>;

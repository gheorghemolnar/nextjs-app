import z from 'zod';

import {
    Schema_Grille_Site_Create_DTO,
    Schema_Grille_Site_Edit_DTO,
    Schema_Grille_Site_RO,
} from '@big/validators';

export type GRILLE_SITE = z.infer<typeof Schema_Grille_Site_RO>;
export type GRILLE_SITE_EDIT = z.infer<typeof Schema_Grille_Site_Edit_DTO>;
export type GRILLE_SITE_CREATE = z.infer<
    typeof Schema_Grille_Site_Create_DTO
>;

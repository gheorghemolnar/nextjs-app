import z from 'zod';

export const Schema_Profil_RO = z.object({
    id         : z.number(),
    codeprofil : z.string(),
    libprofil  : z.string(),
    creaqui    : z.string(),
    modifqui   : z.string(),
    annuqui    : z.string(),
    ordreaff   : z.number()
});

export const Schema_Profil_Create_DTO = Schema_Profil_RO.partial({
    modifqui : true,
    annuqui  : true,
    ordreaff : true
}).omit({ id: true });

export const Schema_Profil_Edit_DTO = Schema_Profil_RO.partial().extend({
    id: z.number()
});

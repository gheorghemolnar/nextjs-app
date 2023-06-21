import z from 'zod';

export const Schema_Atelier_RO = z.object({
    idAtelier   : z.number(),
    codeAtelier : z.string(),
    libAtelier  : z.string(),
    ordreAff    : z.number(),
    creaQuand   : z.string().nullable(),
    creaQui     : z.string(),
    modifQuand  : z.string().nullable(),
    modifQui    : z.string().nullable(),
    annuQuand   : z.string().nullable(),
    annuQui     : z.string().nullable(),
});

export const Schema_Atelier_Create_DTO = Schema_Atelier_RO.partial({
    annuQuand  : true,
    annuQui    : true,
    creaQuand  : true,
    modifQuand : true,
    modifQui   : true,
    ordreaff   : true,
}).omit({ idAtelier: true });

export const Schema_Atelier_Edit_DTO = Schema_Atelier_RO.partial().extend({
    idAtelier: z.number(),
});

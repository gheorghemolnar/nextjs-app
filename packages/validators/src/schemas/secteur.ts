import z from 'zod';

export const Schema_Secteur_RO = z.object({
    idSecteur   : z.number(),
    codeSecteur : z.string(),
    libSecteur  : z.string(),
    ordreAff    : z.number(),
    creaQuand   : z.string().nullable(),
    creaQui     : z.string(),
    modifQuand  : z.string().nullable(),
    modifQui    : z.string().nullable(),
    annuQuand   : z.string().nullable(),
    annuQui     : z.string().nullable()
});

export const Schema_Secteur_Create_DTO = Schema_Secteur_RO.partial({
    annuQuand  : true,
    annuQui    : true,
    creaQuand  : true,
    modifQuand : true,
    modifQui   : true,
    ordreaff   : true
}).omit({ idSecteur: true });

export const Schema_Secteur_Edit_DTO = Schema_Secteur_RO.partial().extend({
    id: z.number()
});

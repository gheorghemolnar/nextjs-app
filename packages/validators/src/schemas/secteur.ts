import z from 'zod';

export const Schema_Secteur_RO = z.object({
    id          : z.number(),
    codesecteur : z.string(),
    libsecteur  : z.string(),
    creaqui     : z.string(),
    modifqui    : z.string(),
    annuqui     : z.string(),
    ordreaff    : z.number(),
});

export const Schema_Secteur_Create_DTO = Schema_Secteur_RO.partial({
    modifqui : true,
    annuqui  : true,
    ordreaff : true,
}).omit({ id: true });

export const Schema_Secteur_Edit_DTO = Schema_Secteur_RO.partial().extend({
    id: z.number(),
});

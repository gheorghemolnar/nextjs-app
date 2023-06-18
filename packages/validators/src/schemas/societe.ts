import z from 'zod';

export const Schema_Societe_RO = z.object({
    id          : z.number(),
    ordreaff    : z.number(),
    modifqui    : z.string(),
    libsociete  : z.string(),
    idsociete   : z.number(),
    creaqui     : z.string(),
    codesociete : z.string(),
    annuqui     : z.string(),
});

export const Schema_Societe_Create_DTO = Schema_Societe_RO.partial({
    modifqui : true,
    annuqui  : true,
    ordreaff : true,
}).omit({ id: true });

export const Schema_Societe_Edit_DTO = Schema_Societe_RO.partial().extend({
    idsociete: z.number(),
});

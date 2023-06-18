import z from 'zod';

export const Schema_Atelier_RO = z.object({
    id          : z.number(),
    codeatelier : z.string(),
    libatelier  : z.string(),
    creaqui     : z.string(),
    modifqui    : z.string(),
    annuqui     : z.string(),
    ordreaff    : z.number(),
});

export const Schema_Atelier_Create_DTO = Schema_Atelier_RO.partial({
    modifqui : true,
    annuqui  : true,
    ordreaff : true,
}).omit({ id: true });

export const Schema_Atelier_Edit_DTO = Schema_Atelier_RO.partial().extend({
    id: z.number(),
});

import z from 'zod';

export const Schema_Site_RO = z.object({
    id         : z.number(),
    codesitebg : z.string(),
    codesiterh : z.string(),
    libsite    : z.string(),
    idsociete  : z.number(),
    creaqui    : z.string(),
    modifqui   : z.string(),
    annuqui    : z.string(),
    ordreaff   : z.number(),
});

export const Schema_Site_Create_DTO = Schema_Site_RO.partial({
    modifqui : true,
    annuqui  : true,
    ordreaff : true,
}).omit({ id: true });

export const Schema_Site_Edit_DTO = Schema_Site_RO.partial().extend({
    id: z.number(),
});

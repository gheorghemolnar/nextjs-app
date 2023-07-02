import z from 'zod';

export const Schema_Paramsite_RO = z.object({
    id        : z.number(),
    idsite    : z.number(),
    idatelier : z.number(),
    idsecteur : z.number(),
    creaqui   : z.string(),
    modifqui  : z.string(),
    annuqui   : z.string()
});

export const Schema_Paramsite_Create_DTO = Schema_Paramsite_RO.partial({
    modifqui : true,
    annuqui  : true
}).omit({ id: true });
export const Schema_Paramsite_Edit_DTO = Schema_Paramsite_RO.partial().extend({
    id: z.number()
});

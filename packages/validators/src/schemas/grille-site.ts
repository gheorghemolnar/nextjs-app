import z from 'zod';

export const Schema_Grille_Site_RO = z.object({
    id            : z.number(),
    idgrilentsit  : z.number(),
    idgrillegr    : z.number(),
    idtypemachine : z.number(),
    idparamsite   : z.number(),
    idcriticite   : z.number(),
    idperiodicite : z.number(),
    ordreaff      : z.number(),
    creaqui       : z.string(),
    modifqui      : z.string(),
    annuqui       : z.string()
});

export const Schema_Grille_Site_Create_DTO = Schema_Grille_Site_RO.partial({
    modifqui : true,
    annuqui  : true
}).omit({ id: true });

export const Schema_Grille_Site_Edit_DTO =
    Schema_Grille_Site_RO.partial().extend({ id: z.number() });

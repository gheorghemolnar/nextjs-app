import z from 'zod';

export const Schema_Grille_Groupe_RO = z.object({
    id           : z.number(),
    codegrillegr : z.string(),
    typegrille   : z.string(),
    libctrl      : z.string(),
    descctrl     : z.string(),
    creaqui      : z.string(),
    modifqui     : z.string(),
    annuqui      : z.string(),
});

export const Schema_Grille_Groupe_Create_DTO = Schema_Grille_Groupe_RO.partial({
    modifqui : true,
    annuqui  : true,
}).omit({ id: true });

export const Schema_Grille_Groupe_Edit_DTO =
    Schema_Grille_Groupe_RO.partial().extend({ id: z.number() });

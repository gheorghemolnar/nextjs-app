import z from 'zod';

export const Schema_Utilisateur_RO = z.object({
    id        : z.number(),
    codeutil  : z.string(),
    idprofil  : z.number(),
    matricule : z.number(),
    nomutil   : z.string(),
    preutil   : z.string(),
    mdputil   : z.string(),
    creaqui   : z.string(),
    modifqui  : z.string(),
    annuqui   : z.string()
});

export const Schema_Utilisateur_Create_DTO = Schema_Utilisateur_RO.partial({
    modifqui : true,
    annuqui  : true
}).omit({ id: true });

export const Schema_Utilisateur_Edit_DTO =
    Schema_Utilisateur_RO.partial().extend({ id: z.number() });

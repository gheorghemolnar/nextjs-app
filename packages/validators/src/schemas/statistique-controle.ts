import z from 'zod';

import { Schema_Atelier_RO, Schema_Controle_Status } from '..';

export const Schema_Statistique_Totaux = z.object({
    resultCont     : Schema_Controle_Status,
    nombreControle : z.number().positive()
});

export const Schema_StatistiqueControle_RO = z.object({
    secteur: z.object({
        idSecteur   : z.number().positive(),
        codeSecteur : z.string(),
        libSecteur  : z.string(),
        creaQuand   : z.string().nullable(),
        creaQui     : z.string().nullable(),
        modifQuand  : z.string().nullable(),
        modifQui    : z.string().nullable(),
        annuQuand   : z.string().nullable(),
        annuQui     : z.string().nullable(),
        ordreAff    : z.number().positive()
    }),
    atelier        : Schema_Atelier_RO.nullable(),
    nombreControle : z.number().positive(),
    statistiques   : z.array(Schema_Statistique_Totaux)
});

export const Schema_StatistiqueControleSecteur_RO =
    Schema_StatistiqueControle_RO.extend({
        atelier: Schema_Atelier_RO.required()
    });

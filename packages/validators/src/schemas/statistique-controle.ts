import z from 'zod';

import { Schema_Atelier_RO, Schema_Controle_Status } from '..';

export const Schema_Statistique_Totaux = z.object({
    resultatCtrl   : Schema_Controle_Status,
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
    atelier        : Schema_Atelier_RO.optional(),
    nombreControle : z.number().positive(),
    statistiques   : z.array(Schema_Statistique_Totaux)
});

/*
export const Schema_StatistiqueControle_RO = z.object({
        idEnteteCtrl     : z.number().positive(),
        codeEnteteCtrl   : z.string(),
        resultatCtrl     : z.string(),
        creaQuand        : z.string().nullable(),
        creaQui          : z.string().nullable(),
        modifQuand       : z.string().nullable(),
        modifQui         : z.string().nullable(),
        annuQuand        : z.string().nullable(),
        annuQui          : z.string().nullable(),
        signature        : z.string().nullable(),
        idGrilEntSit     : z.number(),//.positive(),
    enteteGrilleSite : z.object({
        idGrilEntSit     : z.number(),//.positive(),
        codeGrilleEntSit : z.number().positive(),
        libGrilleEntSit  : z.string(),
        descGrilleEntSit : z.string(),
        creaQuand        : z.string().nullable(),
        creaQui          : z.string().nullable(),
        modifQuand       : z.string().nullable(),
        modifQui         : z.string().nullable(),
        annuQuand        : z.string().nullable(),
        annuQui          : z.string().nullable(),
        ordreAff         : z.number(),
        mails            : z.string().email().nullable(),
        idTypeGrille     : z.number(),//.positive(),
        typeGrille       : z.object({
            idTypeGrille   : z.number(),//.positive(),
            codeTypeGrille : z.string(),
            libTypeGrille  : z.string(),
            creaQuand      : z.string().nullable(),
            creaQui        : z.string().nullable(),
            modifQuand     : z.string().nullable(),
            modifQui       : z.string().nullable(),
            annuQuand      : z.string().nullable(),
            annuQui        : z.string().nullable(),
            ordreAff       : z.number()
        }),
        idParamSite : z.number(),
        paramSite   : z.object({
            idAtelier : z.number().positive(),
            idSecteur : z.number(),
            idSite    : z.number(),
            site      : z.string().nullable(),
            secteur   : z.object({
                idSecteur   : z.number().positive(),
                codeSecteur : z.string(),
                libSecteur  : z.string(),
                creaQuand   : z.string().nullable(),
                creaQui     : z.string().nullable(),
                modifQuand  : z.string().nullable(),
                modifQui    : z.string().nullable(),
                annuQuand   : z.string().nullable(),
                annuQui     : z.string().nullable(),
                ordreAff    : z.number()
            }),
            atelier: Schema_Atelier_RO.nullable(),
        }),
        idPeriodicite : z.number(),//.positive(),
        periodicite   : z.string().nullable(),
        idTypeBloc    : z.number(),//.positive(),
        typeBloc      : z.string().nullable(),
        idParc        : z.number(),//.positive(),
    }),
    nombreControle : z.number().positive(),
    statistiques   : z.array(Schema_Statistique_Totaux)
});
*/

export const Schema_StatistiqueControleSecteur_RO =
    Schema_StatistiqueControle_RO.extend({
        atelier: Schema_Atelier_RO.required()
    });

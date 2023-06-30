import z from 'zod';

/* import { Schema_Photo_RO } from './photo'; */

export const Schema_Controle_Status = z.enum(['C', 'NC', 'NV']);

export const Schema_Type_Grille = z.enum(['M', 'N', 'S', 'R']);

export const Schema_Controle_Atelier = z.object({
    codeAtelier : z.string(),
    idAtelier   : z.number(),
    libAtelier  : z.string()
});

export const Schema_Controle_Secteur = z.object({
    codeSecteur : z.string(),
    idSecteur   : z.number(),
    libSecteur  : z.string()
});

const Schema_Controle_GrilleGroupe = z.object({
    idGrilleGr   : z.number(),
    codeGrilleGr : z.string(),
    libCtrl      : z.string(),
    descCtrl     : z.string().nullable(),
    creaQuand    : z.string().nullable(),
    creaQui      : z.string().nullable(),
    modifQuand   : z.string().nullable(),
    modifQui     : z.string().nullable(),
    annuQuand    : z.string().nullable(),
    annuQui      : z.string().nullable()
});

const Schema_Controle_EnteteGrilleSite = z.object({
    idGrilEntSit     : z.number(),
    codeGrilleEntSit : z.string(),
    libGrilleEntSit  : z.string(),
    descGrilleEntSit : z.string(),
    creaQuand        : z.string().nullable(),
    creaQui          : z.string().nullable(),
    modifQuand       : z.string().nullable(),
    modifQui         : z.string().nullable(),
    annuQuand        : z.string().nullable(),
    annuQui          : z.string().nullable(),
    ordreAff         : z.number(),
    mails            : z.string().nullable(),
    idTypeGrille     : z.number(),
    typeGrille       : z.object({
        idTypeGrille   : z.number(),
        codeTypeGrille : Schema_Type_Grille,
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
        idParamSite : z.number().positive(),
        idAtelier   : z.number().positive(),
        idSecteur   : z.number().positive(),
        idSite      : z.number(),
        site        : z.object({}).nullable(),
        atelier     : Schema_Controle_Atelier,
        secteur     : Schema_Controle_Secteur
    }),
    idPeriodicite : z.number(),
    periodicite   : z.string().nullable(),
    idTypeBloc    : z.number(),
    typeBloc      : z.string().nullable(),
    idParc        : z.number(),
    parc          : z.string().nullable()
});

/*
export const Schema_Controle_RO = z.object({
    codeCont    : z.string(),
    commCont    : z.string().nullable(),
    creaQuand   : z.string(),
    creaQui     : z.string(),
    daHeCont    : z.string(),
    idControle  : z.number(),
    idGrilleSit : z.number(),
    idParc      : z.number(),
    grilleSite  : z.object({
        grilleGroupe : Schema_Controle_GrilleGroupe,
        paramSite    : z.object({
            atelier : Schema_Controle_Atelier,
            secteur : Schema_Controle_Secteur
        })
    }),
    resultCont: Schema_Controle_Status
});
*/

export const Schema_Controle_RO = z.object({
    actionCorr : z.string().nullable(),
    annuQuand  : z.string().nullable(),
    annuQui    : z.string().nullable(),
    codeCont   : z.string(),
    commCont   : z.string().nullable(),
    creaQuand  : z.string(),
    creaQui    : z.string(),
    daHeCont   : z.string(),
    enteteCtrl : z.object({}).nullable(),
    grilleSite : z.object({
        idGrilleSit      : z.number(),
        grilleGroupe     : Schema_Controle_GrilleGroupe,
        enteteGrilleSite : Schema_Controle_EnteteGrilleSite
    }),
    idControle   : z.number().positive(),
    idEnteteCtrl : z.number().positive(),
    idGrilleSit  : z.number().positive(),
    modifQuand   : z.string().nullable(),
    modifQui     : z.string().nullable(),
    resultatCtrl : Schema_Controle_Status.nullable(),
    photos       : z.array(z.object({}))
});

export const Schema_Controle_Edit_DTO = Schema_Controle_RO.pick({
    commCont     : true,
    idControle   : true,
    resultatCtrl : true
}).extend({
    modifQui: z.string()
});

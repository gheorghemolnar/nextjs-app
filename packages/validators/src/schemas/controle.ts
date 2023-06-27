import z from 'zod';

/* import { Schema_Photo_RO } from './photo'; */

export const Schema_Controle_Status = z.enum(['C', 'NC', 'NV']);

/* export const Schema_Controle_RO = z.object({
    CodeAtelier : z.string(),
    CodeCont    : z.string(),
    CodeSecteur : z.string(),
    CommCont    : z.string().optional(),
    CreaQuand   : z.string(),
    CreaQui     : z.string(),
    DaHeCont    : z.string(),
    DescCtrl    : z.string().optional(),
    IdAtelier   : z.number(),
    IdControle  : z.number(),
    IdGrilleGr  : z.number(),
    IdGrilleSit : z.number(),
    IdParc      : z.number(),
    IdSecteur   : z.number(),
    LibAtelier  : z.string(),
    LibCtrl     : z.string(),
    LibSecteur  : z.string(),
    Photos      : Schema_Photo_RO.nullable().optional(),
    ResultCont  : Schema_Controle_Status,
    TypeGrille  : z.string()
}); */

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
    idGrilleGr : z.number(),
    // typeGrille : z.string(), TMP
    libCtrl    : z.string(),
    descCtrl   : z.string().nullable()
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
    codeCont    : z.string(),
    commCont    : z.string().nullable(),
    creaQuand   : z.string(),
    creaQui     : z.string(),
    daHeCont    : z.string(),
    idControle  : z.number(),
    idGrilleSit : z.number(),
    grilleSite  : z.object({
        grilleGroupe : Schema_Controle_GrilleGroupe,
        paramSite    : z.object({
            atelier : Schema_Controle_Atelier,
            secteur : Schema_Controle_Secteur
        })
    }),
    resultatCtrl: Schema_Controle_Status
});

export const Schema_Controle_Edit_DTO = Schema_Controle_RO.partial().extend({
    idControle: z.number()
});

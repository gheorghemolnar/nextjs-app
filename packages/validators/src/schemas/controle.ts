import z from 'zod';

import { Schema_Photo_RO } from './photo';

export const Schema_Controle_Status = z.enum(['C', 'NC', 'NV']);

export const Schema_Controle_RO = z.object({
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
});

export const Schema_Controle_Edit_DTO = Schema_Controle_RO.partial().extend({
    id: z.number()
});

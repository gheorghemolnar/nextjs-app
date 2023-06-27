import z from 'zod';

import {
    Schema_Controle_Edit_DTO,
    Schema_Controle_RO,
    Schema_Controle_Status
} from '@big/validators';

import { QueryPaginationParameters } from './commons';

export type CONTROLE = z.infer<typeof Schema_Controle_RO>;
export type CONTROLE_EDIT = z.infer<typeof Schema_Controle_Edit_DTO>;

export type CONTROLE_STATUS = z.infer<typeof Schema_Controle_Status>;

export type QueryControlesParameters = QueryPaginationParameters & {
    typeGrille: string;
    idSecteur?: string;
    idAtelier?: string;
    startPeriode?: string;
    endPeriode?: string;
};

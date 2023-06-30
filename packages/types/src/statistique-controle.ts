import z from 'zod';

import {
    Schema_Statistique_Totaux,
    Schema_StatistiqueControle_RO,
    Schema_StatistiqueControleSecteur_RO
} from '@big/validators';

import { CONTROLE_STATUS } from '.';

export type STATISTIQUE_CONTROLE = z.infer<
    typeof Schema_StatistiqueControle_RO
>;
export type STATISTIQUE_CONTROLE_SECTEUR = z.infer<
    typeof Schema_StatistiqueControleSecteur_RO
>;

export type STATISTIQUE_TOTAUX = z.infer<typeof Schema_Statistique_Totaux>;

export type QueryStatsGrilleParameters = {
    typeControle: string;
    startPeriode: string;
    endPeriode: string;
    resultatCtrl: string;
};
export type QueryStatsSecteurParameters = QueryStatsGrilleParameters & {
    idSecteur: string;
};

export type STATS_TOTAUX = {
    [k in CONTROLE_STATUS]: number;
};

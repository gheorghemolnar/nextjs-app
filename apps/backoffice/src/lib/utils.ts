import { CONTROLE_STATUS, STATISTIQUE_TOTAUX, STATS_TOTAUX } from '@big/types';

export function formatDate(dateInput: string | Date) {
    if (!dateInput) return '';

    const dateNew = new Date(dateInput);

    if (!dateNew) return '--';

    return `${dateNew.toLocaleDateString()} à ${dateNew.toLocaleTimeString()}`;
}

export function getUrlBase() {
    return window.location.origin;
}

export function extractStats(statistiques: STATISTIQUE_TOTAUX[]): STATS_TOTAUX {
    const result: any = {} as unknown;

    for (const statistique of statistiques) {
        const key: CONTROLE_STATUS = statistique.resultCont;
        result[key] = statistique.nombreControle;
    }
    return result;
}

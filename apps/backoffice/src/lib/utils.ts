import { CONTROLE_STATUS, STATISTIQUE_TOTAUX, STATS_TOTAUX } from '@big/types';

export function formatDate(dateInput: string | Date) {
    if (!dateInput) return '';

    const dateNew = new Date(dateInput);

    if (!dateNew) return '--';

    return `${dateNew.toLocaleDateString()} à ${dateNew.toLocaleTimeString()}`;
}

export function extractStats(statistiques: STATISTIQUE_TOTAUX[]): STATS_TOTAUX {
    const result: any = {} as unknown;

    for (const statistique of statistiques) {
        const key: CONTROLE_STATUS = statistique.resultatCtrl;
        result[key] = statistique.nombreControle;
    }
    return result;
}

export function getObjectKeyValue(inputObject: any, key: string) {
    let value: string | number = inputObject;
    const keys: string[] = key.split('.');

    for (const key of keys) {
        if (value && typeof value === 'object' && key in value)
            value = value[key];
        else return '';
    }

    return value;
}

export function sortArrayByKey<T>(inputArray: T[], key: string): T[] {
    return [...inputArray].sort(function (a, b) {
        const valueKeyA: string | number = getObjectKeyValue(a, key);
        const valueKeyB: string | number = getObjectKeyValue(b, key);

        if (valueKeyA < valueKeyB) return -1;
        else valueKeyA > valueKeyB;
        return 1;

        return 0;
    });
}

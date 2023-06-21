export type CONTROL_TYPES = 'matiere' | 'netoyage' | 'sanitaire' | 'reception';
export type CONTROL_TYPE = {
    [k in CONTROL_TYPES]: {
        secteurs?: SECTEUR[];
    };
};

export interface SECTEUR {
    name: string;
    nc: number;
    total: number;
    comm: string;
    codeSecteur: string;
}

export const controles: CONTROL_TYPE = {
    matiere: {
        secteurs: [
            {
                name        : '1ère transformation Boeuf',
                nc          : 9,
                total       : 120,
                comm        : '+20.1% par rapport au dernièr mois',
                codeSecteur : '1'
            },
            {
                name        : '2ème transformation Boeuf',
                nc          : 5,
                total       : 420,
                comm        : '+6.1% par rapport au dernièr mois',
                codeSecteur : '2'
            },
            {
                name        : '1ère transformation Porc',
                nc          : 13,
                total       : 620,
                comm        : '+19.1% par rapport au dernièr mois',
                codeSecteur : '3'
            },
            {
                name        : '2ème transformation Porc',
                nc          : 13,
                total       : 620,
                comm        : '+19.1% par rapport au dernièr mois',
                codeSecteur : '4'
            },
            {
                name        : '3ème transformation',
                nc          : 0,
                total       : 187,
                comm        : '+0.1% par rapport au dernièr mois',
                codeSecteur : '5'
            }
        ]
    },
    netoyage  : {},
    sanitaire : {},
    reception : {}
};

export function sleep(n = 500) {
    return new Promise((r) => setTimeout(r, n));
}

export function getControles(controleId: CONTROL_TYPES): SECTEUR[] {
    console.log('Controles', controleId);

    if (controleId && controles[controleId]?.secteurs)
        return controles[controleId].secteurs as unknown as SECTEUR[];

    return [];
}

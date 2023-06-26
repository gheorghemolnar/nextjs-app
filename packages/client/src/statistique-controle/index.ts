import type { AxiosInstance } from 'axios';
import z from 'zod';

import {
    QueryStatsGrilleParameters,
    QueryStatsSecteurParameters,
    type STATISTIQUE_CONTROLE,
    type STATISTIQUE_CONTROLE_SECTEUR
} from '@big/types';
import {
    Schema_StatistiqueControle_RO,
    Schema_StatistiqueControleSecteur_RO
} from '@big/validators';

import { objectToString } from '..';

export const statistiqueControleREST = ({
    client
}: {
    client: AxiosInstance;
}) => {
    const getAllByGrilleType = async (
        queryParameters: QueryStatsGrilleParameters
    ) => {
        const { typeControle, ...others } = queryParameters;
        const sQueryParameters = objectToString(others);
        const response = await client<STATISTIQUE_CONTROLE[]>({
            method : 'GET',
            url    : `statistiquescontrole/typegrille/${typeControle.toUpperCase()}/secteurs?${sQueryParameters}`
        });

        //Check if the response is valid
        z.array(Schema_StatistiqueControle_RO).parse(response.data);

        return response.data;
    };

    const getAllByGrilleTypeSecteur = async (
        queryParameters: QueryStatsSecteurParameters
    ) => {
        const { typeControle, secteurId, ...others } = queryParameters;
        const sQueryParameters = objectToString(others);
        const response = await client<STATISTIQUE_CONTROLE_SECTEUR[]>({
            method : 'GET',
            url    : `statistiquescontrole/typegrille/${typeControle.toUpperCase()}/secteurs/${secteurId}?${sQueryParameters}`
        });

        //Check if the response is valid
        z.array(Schema_StatistiqueControleSecteur_RO).parse(response.data);

        return response.data;
    };

    return {
        getAllByGrilleType,
        getAllByGrilleTypeSecteur
    };
};

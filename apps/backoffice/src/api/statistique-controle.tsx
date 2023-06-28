import {
    QueryStatsGrilleParameters,
    QueryStatsSecteurParameters
} from '@big/types';

import { useQuery } from '@tanstack/react-query';

import { client, errorHandler } from '.';

export const useListStatistiqueControleByGrille = ({
    typeControle,
    startPeriode,
    endPeriode
}: QueryStatsGrilleParameters) => {
    const { data, isLoading, refetch, isSuccess, isError } = useQuery({
        queryKey: [
            'statistiquesControlesGrille',
            { typeControle, startPeriode, endPeriode }
        ],
        queryFn: async () => {
            return await client().statistiquesControles.getAllByGrilleType({
                typeControle: typeControle.toUpperCase(),
                startPeriode,
                endPeriode
            });
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    return {
        data: data ?? [],
        isLoading,
        refetch,
        isError,
        isSuccess
    };
};

export const useListStatistiqueControleByGrilleSecteur = ({
    secteurId,
    typeControle,
    startPeriode,
    endPeriode
}: QueryStatsSecteurParameters) => {
    const { data, isLoading, refetch, isSuccess, isError } = useQuery({
        queryKey: [
            'statistiquesControlesGrilleSecteur',
            { typeControle, secteurId }
        ],
        queryFn: async () => {
            return await client().statistiquesControles.getAllByGrilleTypeSecteur(
                { typeControle, secteurId, startPeriode, endPeriode }
            );
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    return {
        data: data ?? [],
        isLoading,
        refetch,
        isError,
        isSuccess
    };
};

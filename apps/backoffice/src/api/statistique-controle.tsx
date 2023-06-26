import {
    QueryStatsGrilleParameters,
    QueryStatsSecteurParameters
} from '@big/types';

import { useQuery } from '@tanstack/react-query';

import { client, errorHandler } from '.';

export const useListStatistiqueControleByGrille = ({
    pageIndex,
    pageSize,
    typeControle
}: QueryStatsGrilleParameters) => {
    const { data, isLoading, refetch, isSuccess, isError } = useQuery({
        queryKey: [
            'statistiquesControlesGrille',
            { pageIndex, pageSize, typeControle }
        ],
        queryFn: async () => {
            return await client().statistiquesControles.getAllByGrilleType({
                pageIndex,
                pageSize,
                typeControle
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
    pageIndex,
    pageSize,
    secteurId,
    typeControle
}: QueryStatsSecteurParameters) => {
    const { data, isLoading, refetch, isSuccess, isError } = useQuery({
        queryKey: [
            'statistiquesControlesGrilleSecteur',
            { pageIndex, pageSize, typeControle, secteurId }
        ],
        queryFn: async () => {
            return await client().statistiquesControles.getAllByGrilleTypeSecteur(
                { pageIndex, pageSize, secteurId, typeControle }
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

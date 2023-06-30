import {
    QueryStatsGrilleParameters,
    QueryStatsSecteurParameters
} from '@big/types';

import { useQuery } from '@tanstack/react-query';

import { client, errorHandler } from '.';

export const useListStatistiqueControleByGrille = ({
    typeControle,
    startPeriode,
    endPeriode,
    resultatCtrl
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
                endPeriode,
                resultatCtrl
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
    idSecteur,
    typeControle,
    startPeriode,
    endPeriode,
    resultatCtrl
}: QueryStatsSecteurParameters) => {
    const { data, isLoading, refetch, isSuccess, isError } = useQuery({
        queryKey: [
            'statistiquesControlesGrilleSecteur',
            { typeControle, idSecteur }
        ],
        queryFn: async () => {
            return await client().statistiquesControles.getAllByGrilleTypeSecteur(
                {
                    typeControle,
                    idSecteur,
                    startPeriode,
                    endPeriode,
                    resultatCtrl
                }
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

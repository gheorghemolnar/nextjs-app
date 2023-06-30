import { QueryControlesParameters } from '@big/types';

import { useMutation, useQuery } from '@tanstack/react-query';

import { client, errorHandler, successHandler } from '.';

export const useListControle = ({
    typeGrille,
    idSecteur,
    idAtelier,
    startPeriode,
    endPeriode,
    pageIndex,
    pageSize,
    resultatCtrl
}: QueryControlesParameters) => {
    const { data, isLoading, refetch, isSuccess, isError } = useQuery({
        queryKey: [
            'controles',
            {
                typeGrille,
                idSecteur,
                idAtelier,
                startPeriode,
                endPeriode,
                pageIndex,
                pageSize,
                resultatCtrl
            }
        ],
        queryFn: async () => {
            return await client().controles.getAll({
                typeGrille,
                idSecteur,
                idAtelier,
                startPeriode,
                endPeriode,
                pageIndex,
                pageSize,
                resultatCtrl
            });
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    return {
        data: data ?? { data: [], totalCount: -1 },
        isLoading,
        refetch,
        isError,
        isSuccess
    };
};

type CONTROLE_EDIT_NEW = {
    path: string;
    op: string;
    value: string;
};
export const useEditControle = (idControle: number) => {
    const { data, isLoading, isSuccess, mutateAsync, isError } = useMutation({
        mutationKey : ['editControle', { idControle }],
        mutationFn  : async (dto: CONTROLE_EDIT_NEW[]) => {
            //const parsedDto = Schema_Controle_Edit_DTO.parse(dto);
            return await client().controles.edit(idControle, dto);
        },
        onError: (error) => {
            errorHandler(error);
        },
        onSuccess: async () => {
            await successHandler({
                title       : 'Contrôle mis à jour',
                description : 'Le contrôle a bien été mis à jour',
                queryKey    : ['controles']
            });
        },
        cacheTime: 0
    });

    return {
        data: data ?? null,
        isLoading,
        isSuccess,
        isError,
        mutateAsync
    };
};

export const useGetByIdControle = (idControle: number) => {
    const { data, isLoading, refetch, isSuccess, isError } = useQuery({
        queryKey: [
            'controles',
            {
                idControle
            }
        ],
        queryFn: async () => {
            return await client().controles.getById(idControle);
        },
        onError: (error) => {
            errorHandler(error);
        },
        cacheTime: 0
    });

    return {
        data: data ?? { data: null },
        isLoading,
        refetch,
        isError,
        isSuccess
    };
};

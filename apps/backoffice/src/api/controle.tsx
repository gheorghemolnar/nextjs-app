import { CONTROLE_EDIT, QueryControlesParameters } from '@big/types';
import { Schema_Controle_Edit_DTO } from '@big/validators';

import { useMutation, useQuery } from '@tanstack/react-query';

import { client, errorHandler, successHandler } from '.';

export const useListControle = ({
    typeGrille,
    idSecteur,
    idAtelier,
    startPeriode,
    endPeriode,
    pageIndex,
    pageSize
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
                pageSize
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
                pageSize
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

export const useEditControle = () => {
    const { data, isLoading, isSuccess, mutateAsync, isError } = useMutation({
        mutationKey : ['editControle'],
        mutationFn  : async (dto: CONTROLE_EDIT) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const parsedDto = Schema_Controle_Edit_DTO.parse(dto);
            return await client().controles.edit(parsedDto);
        },
        onError: (error) => {
            errorHandler(error);
        },
        onSuccess: async () => {
            await successHandler({
                title       : 'Contrôle mis à jour',
                description : "L'contrôle a bien été mis à jour",
                queryKey    : ['controles']
            });
        }
    });

    return {
        data: data?.data ?? null,
        //count : data?.numberOfRecords ?? 0,
        isLoading,
        isSuccess,
        isError,
        mutateAsync
    };
};

import { ATELIER_CREATE } from '@big/types';
import { Schema_Atelier_Create_DTO } from '@big/validators';

import { useMutation, useQuery } from '@tanstack/react-query';

import { client, errorHandler, successHandler } from '.';

export const useListAtelier = () => {
    const { data, isLoading, refetch, isSuccess, isError } = useQuery({
        queryKey : ['ateliers'],
        queryFn  : async () => {
            return await client().ateliers.getAll();
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

export const useCreateAtelier = () => {
    const { data, isLoading, isSuccess, mutateAsync, isError } = useMutation({
        mutationKey : ['createAtelier'],
        mutationFn  : async (dto: ATELIER_CREATE) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const parsedDto = Schema_Atelier_Create_DTO.parse(dto);
            return await client().ateliers.create(parsedDto);
        },
        onError: (error) => {
            errorHandler(error);
        },
        onSuccess: async () => {
            await successHandler({
                title       : 'Atelier créé',
                description : "L'atelier a bien été créé",
                queryKey    : ['ateliers']
            });
        }
    });

    return {
        data  : data?.data ?? null,
        count : data?.numberOfRecords ?? 0,
        isLoading,
        isSuccess,
        isError,
        mutateAsync
    };
};

import { SECTEUR_CREATE } from '@big/types';
import { Schema_Secteur_Create_DTO } from '@big/validators';

import { useMutation, useQuery } from '@tanstack/react-query';

import { client, errorHandler, successHandler } from '.';

export const useListSecteur = () => {
    const { data, isLoading, refetch, isSuccess, isError } = useQuery({
        queryKey : ['secteurs'],
        queryFn  : async () => {
            return await client().secteurs.getAll();
        },
        onError: (error) => {
            errorHandler(error);
        },
    });

    return {
        data  : data?.data ?? [],
        count : data?.numberOfRecords ?? 0,
        isLoading,
        refetch,
        isError,
        isSuccess,
    };
};

export const useCreateSecteur = () => {
    const { data, isLoading, isSuccess, mutateAsync, isError } = useMutation({
        mutationKey : ['createSecteur'],
        mutationFn  : async (dto: SECTEUR_CREATE) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const parsedDto = Schema_Secteur_Create_DTO.parse(dto);
            return await client().secteurs.create(parsedDto);
        },
        onError: (error) => {
            errorHandler(error);
        },
        onSuccess: async () => {
            await successHandler({
                title       : 'Secteur créé',
                description : "Le secteur a bien été créé",
                queryKey    : ['secteurs'],
            });
        },
    });

    return {
        data  : data?.data ?? null,
        count : data?.numberOfRecords ?? 0,
        isLoading,
        isSuccess,
        isError,
        mutateAsync,
    };
};

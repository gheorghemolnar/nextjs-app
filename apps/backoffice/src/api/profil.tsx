import { PROFIL_CREATE } from '@big/types';
import { Schema_Profil_Create_DTO } from '@big/validators';

import { useMutation, useQuery } from '@tanstack/react-query';

import { client, errorHandler, successHandler } from '.';

export const useListProfil = () => {
    const { data, isLoading, refetch, isSuccess, isError } = useQuery({
        queryKey : ['profils'],
        queryFn  : async () => {
            return await client().profils.getAll();
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

export const useCreateProfil = () => {
    const { data, isLoading, isSuccess, mutateAsync, isError } = useMutation({
        mutationKey : ['createProfil'],
        mutationFn  : async (dto: PROFIL_CREATE) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const parsedDto = Schema_Profil_Create_DTO.parse(dto);
            return await client().profils.create(parsedDto);
        },
        onError: (error) => {
            errorHandler(error);
        },
        onSuccess: async () => {
            await successHandler({
                title       : 'Profil créé',
                description : "Le profil a bien été créé",
                queryKey    : ['profils'],
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

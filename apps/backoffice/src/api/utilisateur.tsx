import { UTILISATEUR_CREATE } from '@big/types';
import { Schema_Utilisateur_Create_DTO } from '@big/validators';

import { useMutation, useQuery } from '@tanstack/react-query';

import { client, errorHandler, successHandler } from '.';

export const useListUtilisateur = () => {
    const { data, isLoading, refetch, isSuccess, isError } = useQuery({
        queryKey : ['utilisateurs'],
        queryFn  : async () => {
            return await client().utilisateurs.getAll();
        },
        onError: (error) => {
            errorHandler(error);
        }
    });

    return {
        data  : data?.data ?? [],
        count : data?.numberOfRecords ?? 0,
        isLoading,
        refetch,
        isError,
        isSuccess
    };
};

export const useCreateUtilisateur = () => {
    const { data, isLoading, isSuccess, mutateAsync, isError } = useMutation({
        mutationKey : ['createUtilisateur'],
        mutationFn  : async (dto: UTILISATEUR_CREATE) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const parsedDto = Schema_Utilisateur_Create_DTO.parse(dto);
            return await client().utilisateurs.create(parsedDto);
        },
        onError: (error) => {
            errorHandler(error);
        },
        onSuccess: async () => {
            await successHandler({
                title       : 'Utilisateur créé',
                description : "L'utilisateur a bien été créé",
                queryKey    : ['utilisateurs']
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

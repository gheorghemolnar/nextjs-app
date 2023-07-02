import { GRILLE_GROUPE_CREATE } from '@big/types';
import { Schema_Grille_Groupe_Create_DTO } from '@big/validators';

import { useMutation, useQuery } from '@tanstack/react-query';

import { client, errorHandler, successHandler } from '.';

export const useListGrillesGroupe = () => {
    const { data, isLoading, refetch, isSuccess, isError } = useQuery({
        queryKey : ['grillesgroupe'],
        queryFn  : async () => {
            return await client().grillesgroupe.getAll();
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

export const useCreateGrilleGroupe = () => {
    const { data, isLoading, isSuccess, mutateAsync, isError } = useMutation({
        mutationKey : ['createGrillegroupe'],
        mutationFn  : async (dto: GRILLE_GROUPE_CREATE) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const parsedDto = Schema_Grille_Groupe_Create_DTO.parse(dto);
            return await client().grillesgroupe.create(parsedDto);
        },
        onError: (error) => {
            errorHandler(error);
        },
        onSuccess: async () => {
            await successHandler({
                title       : 'Grille groupe créée',
                description : 'La grille groupe a bien été créée',
                queryKey    : ['grillesgroupe']
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

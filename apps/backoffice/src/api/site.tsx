import { SITE_CREATE } from '@big/types';
import { Schema_Site_Create_DTO } from '@big/validators';

import { useMutation, useQuery } from '@tanstack/react-query';

import { client, errorHandler, successHandler } from '.';

export const useListSite = () => {
    const { data, isLoading, refetch, isSuccess, isError } = useQuery({
        queryKey : ['sites'],
        queryFn  : async () => {
            return await client().sites.getAll();
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

export const useCreateSite = () => {
    const { data, isLoading, isSuccess, mutateAsync, isError } = useMutation({
        mutationKey : ['createSite'],
        mutationFn  : async (dto: SITE_CREATE) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const parsedDto = Schema_Site_Create_DTO.parse(dto);
            return await client().sites.create(parsedDto);
        },
        onError: (error) => {
            errorHandler(error);
        },
        onSuccess: async () => {
            await successHandler({
                title       : 'Site créé',
                description : 'Le site a bien été créé',
                queryKey    : ['sites']
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

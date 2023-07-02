import { LOGIN_CREATE } from '@big/types';
import { Schema_Login_Create_DTO } from '@big/validators';

import { useMutation } from '@tanstack/react-query';

import { client, errorHandler, successHandler } from '.';


export const useLogin = () => {
    const { data, isLoading, isSuccess, mutateAsync, isError } = useMutation({
        mutationKey : ['login'],
        mutationFn  : async (dto: LOGIN_CREATE) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const parsedDto = Schema_Login_Create_DTO.parse(dto);
            return await client().auth.logIn(parsedDto);
        },
        onError: (error) => {
            errorHandler(error);
        },
        onSuccess: async () => {
            await successHandler({
                title       : 'Authentification réussie',
                description : "La connexion a réussi",
                queryKey    : ['authLogin']
            });
        },
        cacheTime: 0
    });

    return {
        data: data?.data ?? null,
        isLoading,
        isSuccess,
        isError,
        mutateAsync
    };
};

export const useLogOut = () => {
    const { data, isLoading, isSuccess, mutateAsync, isError } = useMutation({
        mutationKey : ['logout'],
        mutationFn  : async (dto: LOGIN_CREATE) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const parsedDto = Schema_Login_Create_DTO.parse(dto);
            return await client().auth.logIn(parsedDto);
        },
        onError: (error) => {
            errorHandler(error);
        },
        onSuccess: async () => {
            await successHandler({
                title       : 'Déconnexion réussie',
                description : "La déconnexion a réussi",
                queryKey    : ['authLogout']
            });
        },
        cacheTime: 0
    });

    return {
        data: data?.data ?? null,
        isLoading,
        isSuccess,
        isError,
        mutateAsync
    };
};

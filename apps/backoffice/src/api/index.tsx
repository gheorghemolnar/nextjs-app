import { AxiosError, HttpStatusCode } from 'axios';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { CLIENT_API } from '@big/client';
import type { IResponseRO } from '@big/types';
import { toast } from '@big/ui';

import { queryClient } from '@backoffice/providers/query-provider';

const PORT = import.meta.env.VITE_PORT ?? 3000;
const URL = import.meta.env.VITE_URL ?? 'localhost';
const SCHEME = import.meta.env.VITE_ENV === 'production' ? 'https' : 'http';
const BACKEND_API_URL = import.meta.env.VITE_API_URL ?? '';

export const client = () =>
    //We make it as a function to be able to pass the Token when authentication is done
    CLIENT_API({
        host:
            BACKEND_API_URL?.length > 0
                ? (BACKEND_API_URL as `https://${string}`)
                : // eslint-disable-next-line unicorn/no-nested-ternary
                SCHEME === 'https'
                ? `${SCHEME}://${URL}`
                : `${SCHEME}://${URL}:${PORT}`
    });

export const errorHandler = (error: unknown) => {
    if (error instanceof ZodError) {
        toast({
            title       : 'Les données envoyées sont invalides',
            description : fromZodError(error).message,
            variant     : 'destructive'
        });
        return;
    }
    if (error instanceof AxiosError) {
        const castedError = error as AxiosError<IResponseRO<null>>;
        toast({
            title       : `Une erreur est survenue: ${castedError.response?.status}`,
            description : castedError.response?.data.errorMessage,
            variant     : 'destructive'
        });
        if (castedError.response?.status === HttpStatusCode.Unauthorized) {
            //TODO: redirect to login
        }
        return;
    }
    if (error instanceof Error) {
        toast({
            title       : 'Une erreur est survenue',
            description : error.message,
            variant     : 'destructive'
        });
        return;
    }

    toast({
        title       : 'Une erreur est survenue',
        description : 'Impossible de récupérer vos informations',
        variant     : 'destructive'
    });
};

export const successHandler = async ({
    title = 'Opération réussie',
    description = 'Les données ont été mises à jour',
    queryKey
}: {
    title: string;
    description: string;
    queryKey?: string[];
}) => {
    toast({
        title,
        description,
        variant: 'success'
    });
    if (!queryKey) return;
    await queryClient.invalidateQueries(queryKey);
};

import type { AxiosInstance } from 'axios';
import z from 'zod';

import {
    IResponseRO,
    type UTILISATEUR,
    type UTILISATEUR_CREATE
} from '@big/types';
import { Schema_Utilisateur_RO } from '@big/validators';

export const utilisateurREST = ({ client }: { client: AxiosInstance }) => {
    const getAll = async () => {
        const response = await client<IResponseRO<UTILISATEUR[]>>({
            method : 'GET',
            url    : '/utilisateurs'
        });

        //Check if the response is valid
        z.array(Schema_Utilisateur_RO).parse(response.data.data);

        return response.data;
    };

    const create = async (dto: UTILISATEUR_CREATE) => {
        const response = await client<IResponseRO<UTILISATEUR>>({
            method : 'POST',
            url    : '/utilisateurs',
            data   : dto
        });

        //Check if the response is valid
        Schema_Utilisateur_RO.parse(response.data.data);

        return response.data;
    };

    return {
        getAll,
        create
    };
};

import type { AxiosInstance } from 'axios';
import z from 'zod';

import { IResponseRO, type PROFIL, type PROFIL_CREATE } from '@big/types';
import { Schema_Profil_RO } from '@big/validators';

export const profilREST = ({ client }: { client: AxiosInstance }) => {
    const getAll = async () => {
        const response = await client<IResponseRO<PROFIL[]>>({
            method : 'GET',
            url    : '/profils'
        });

        //Check if the response is valid
        z.array(Schema_Profil_RO).parse(response.data.data);

        return response.data;
    };

    const create = async (dto: PROFIL_CREATE) => {
        const response = await client<IResponseRO<PROFIL>>({
            method : 'POST',
            url    : '/profils',
            data   : dto
        });

        //Check if the response is valid
        Schema_Profil_RO.parse(response.data.data);

        return response.data;
    };

    return {
        getAll,
        create
    };
};

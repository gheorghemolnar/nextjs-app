import type { AxiosInstance } from 'axios';
import z from 'zod';

import { IResponseRO, type SECTEUR, type SECTEUR_CREATE } from '@big/types';
import { Schema_Secteur_RO } from '@big/validators';

export const secteurREST = ({ client }: { client: AxiosInstance }) => {
    const getAll = async () => {
        const response = await client<IResponseRO<SECTEUR[]>>({
            method : 'GET',
            url    : '/secteurs'
        });

        //Check if the response is valid
        z.array(Schema_Secteur_RO).parse(response.data.data);

        return response.data;
    };

    const create = async (dto: SECTEUR_CREATE) => {
        const response = await client<IResponseRO<SECTEUR>>({
            method : 'POST',
            url    : '/secteurs',
            data   : dto
        });

        //Check if the response is valid
        Schema_Secteur_RO.parse(response.data.data);

        return response.data;
    };

    return {
        getAll,
        create
    };
};

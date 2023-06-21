import type { AxiosInstance } from 'axios';
import z from 'zod';

import { type ATELIER, type ATELIER_CREATE, IResponseRO } from '@big/types';
import { Schema_Atelier_RO } from '@big/validators';

export const atelierREST = ({ client }: { client: AxiosInstance }) => {
    const getAll = async () => {
        const response = await client<ATELIER[]>({
            method : 'GET',
            url    : '/ateliers'
        });

        //Check if the response is valid
        z.array(Schema_Atelier_RO).parse(response.data);

        return response.data;
    };

    const create = async (dto: ATELIER_CREATE) => {
        const response = await client<IResponseRO<ATELIER>>({
            method : 'POST',
            url    : '/ateliers',
            data   : dto
        });

        //Check if the response is valid
        Schema_Atelier_RO.parse(response.data.data);

        return response.data;
    };

    return {
        getAll,
        create
    };
};

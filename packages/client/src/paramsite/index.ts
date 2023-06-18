import type { AxiosInstance } from 'axios';
import z from 'zod';

import { IResponseRO, type PARAMSITE, type PARAMSITE_CREATE } from '@big/types';
import { Schema_Site_RO } from '@big/validators';

export const paramsiteREST = ({ client }: { client: AxiosInstance }) => {
    const getAll = async () => {
        const response = await client<IResponseRO<PARAMSITE[]>>({
            method : 'GET',
            url    : '/paramsites',
        });

        //Check if the response is valid
        z.array(Schema_Site_RO).parse(response.data.data);

        return response.data;
    };

    const create = async (dto: PARAMSITE_CREATE) => {
        const response = await client<IResponseRO<PARAMSITE>>({
            method : 'POST',
            url    : '/paramsites',
            data   : dto,
        });

        //Check if the response is valid
        Schema_Site_RO.parse(response.data.data);

        return response.data;
    };

    return {
        getAll,
        create,
    };
};

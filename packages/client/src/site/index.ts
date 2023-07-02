import type { AxiosInstance } from 'axios';
import z from 'zod';

import { IResponseRO, type SITE, type SITE_CREATE } from '@big/types';
import { Schema_Site_RO } from '@big/validators';

export const siteREST = ({ client }: { client: AxiosInstance }) => {
    const getAll = async () => {
        const response = await client<IResponseRO<SITE[]>>({
            method : 'GET',
            url    : '/sites'
        });

        //Check if the response is valid
        z.array(Schema_Site_RO).parse(response.data.data);

        return response.data;
    };

    const create = async (dto: SITE_CREATE) => {
        const response = await client<IResponseRO<SITE>>({
            method : 'POST',
            url    : '/sites',
            data   : dto
        });

        //Check if the response is valid
        Schema_Site_RO.parse(response.data.data);

        return response.data;
    };

    return {
        getAll,
        create
    };
};

import type { AxiosInstance } from 'axios';
import z from 'zod';

import { IResponseRO, type GRILLE_SITE, type GRILLE_SITE_CREATE } from '@big/types';
import { Schema_Grille_Site_RO } from '@big/validators';

export const grillegroupeREST = ({ client }: { client: AxiosInstance }) => {
    const getAll = async () => {
        const response = await client<IResponseRO<GRILLE_SITE[]>>({
            method : 'GET',
            url    : '/grillessite',
        });

        //Check if the response is valid
        z.array(Schema_Grille_Site_RO).parse(response.data.data);

        return response.data;
    };

    const create = async (dto: GRILLE_SITE_CREATE) => {
        const response = await client<IResponseRO<GRILLE_SITE>>({
            method : 'POST',
            url    : '/grillessite',
            data   : dto,
        });

        //Check if the response is valid
        Schema_Grille_Site_RO.parse(response.data.data);

        return response.data;
    };

    return {
        getAll,
        create,
    };
};

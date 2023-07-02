import type { AxiosInstance } from 'axios';
import z from 'zod';

import {
    type GRILLE_GROUPE,
    type GRILLE_GROUPE_CREATE,
    IResponseRO
} from '@big/types';
import { Schema_Grille_Groupe_RO } from '@big/validators';

export const grillegroupeREST = ({ client }: { client: AxiosInstance }) => {
    const getAll = async () => {
        const response = await client<IResponseRO<GRILLE_GROUPE[]>>({
            method : 'GET',
            url    : '/grillesgroupe'
        });

        //Check if the response is valid
        z.array(Schema_Grille_Groupe_RO).parse(response.data.data);

        return response.data;
    };

    const create = async (dto: GRILLE_GROUPE_CREATE) => {
        const response = await client<IResponseRO<GRILLE_GROUPE>>({
            method : 'POST',
            url    : '/grillesgroupe',
            data   : dto
        });

        //Check if the response is valid
        Schema_Grille_Groupe_RO.parse(response.data.data);

        return response.data;
    };

    return {
        getAll,
        create
    };
};

import type { AxiosInstance } from 'axios';
import z from 'zod';

import { type CONTROLE, type CONTROLE_EDIT, IResponseRO } from '@big/types';
import { Schema_Controle_RO } from '@big/validators';

import { getServerHeader, objectToString, ServerResponseHeaders } from '..';

export const controleREST = <T>({ client }: { client: AxiosInstance }) => {
    const getAll = async (queryParameters: T) => {
        const sQueryParameters = objectToString(queryParameters);
        const response = await client<CONTROLE[]>({
            method : 'GET',
            url    : `/controles?${sQueryParameters}`
        });

        //Check if the response is valid
        z.array(Schema_Controle_RO).parse(response.data);

        const headers = response.headers;

        return {
            data       : response.data,
            totalCount : getServerHeader<number>(
                headers,
                ServerResponseHeaders.totalCount
            )
        };
    };

    const edit = async (dto: CONTROLE_EDIT) => {
        const response = await client<IResponseRO<CONTROLE>>({
            method : 'PUT',
            url    : '/controles',
            data   : dto
        });

        //Check if the response is valid
        Schema_Controle_RO.parse(response.data.data);

        return response.data;
    };

    return {
        getAll,
        edit
    };
};
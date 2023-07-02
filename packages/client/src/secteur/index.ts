import type { AxiosInstance } from 'axios';
import z from 'zod';

import { IResponseRO, type SECTEUR, type SECTEUR_CREATE } from '@big/types';
import { Schema_Secteur_RO } from '@big/validators';

import { getServerHeader, objectToString, ServerResponseHeaders } from '..';

export const secteurREST = <T>({ client }: { client: AxiosInstance }) => {
    const getAll = async (queryParameters: T) => {
        const sQueryParameters = objectToString(queryParameters);
        const response = await client<SECTEUR[]>({
            method : 'GET',
            url    : `/secteurs?${sQueryParameters}`
        });

        //Check if the response is valid
        z.array(Schema_Secteur_RO).parse(response.data);

        const headers = response.headers;

        return {
            data       : response.data,
            totalCount : getServerHeader<number>(
                headers,
                ServerResponseHeaders.totalCount
            )
        };
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

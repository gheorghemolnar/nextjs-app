import axios, { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';

import { QueryPaginationParameters } from '@big/types';
import { DEFAULT_TIMEOUT } from '@big/validators';

import { atelierREST } from './atelier';
import { controleREST } from './controle';
import { grillegroupeREST } from './grillegroupe';
import { paramsiteREST } from './paramsite';
import { profilREST } from './profil';
import { secteurREST } from './secteur';
import { siteREST } from './site';
import { statistiqueControleREST } from './statistique-controle';
import { utilisateurREST } from './utilisateur';

type Host = `https://${string}` | `http://${string}`;

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 20;

export enum ServerResponseHeaders {
    totalCount = 'x-total-count',
    serverErrorCode = 'x-error-code'
}

//TODO: !!! REWORK Typescript !!!
export function getServerHeader<T>(
    headers: AxiosResponseHeaders | RawAxiosResponseHeaders,
    key: ServerResponseHeaders
): T | void {
    if (headers[key]) return Number(headers[key]) as T;

    return;
}

export function objectToString<T>(object: T): string {
    const parameters = new URLSearchParams();

    for (const key in object) {
        if (object[key] != null && object[key] !== 'undefined') {
            const value = object[key];
            parameters.append(key, String(value));
        }
    }

    return parameters.toString();
}

export const CLIENT_API = ({
    host,
    timeout = DEFAULT_TIMEOUT
}: {
    host: Host;
    timeout?: number;
}) => {
    host = host.replaceAll(' ', '') as Host;
    if (host.endsWith('/')) host = host.slice(0, -1) as Host;

    //Check that the host is valid with a regex for http and https
    const regex = /^(http|https):\/\/[^ "]+$/;
    if (!regex.test(host)) {
        throw new Error('Invalid host');
    }

    const url = `${host}`;
    const axiosClient = axios.create({ baseURL: url, timeout });

    const ateliers = atelierREST<QueryPaginationParameters>({
        client: axiosClient
    });
    const controles = controleREST({ client: axiosClient });
    const sites = siteREST({ client: axiosClient });
    const grillesgroupe = grillegroupeREST({ client: axiosClient });
    const paramsites = paramsiteREST({ client: axiosClient });
    const profils = profilREST({ client: axiosClient });
    const secteurs = secteurREST({ client: axiosClient });
    const statistiquesControles = statistiqueControleREST({
        client: axiosClient
    });
    const utilisateurs = utilisateurREST({ client: axiosClient });

    return {
        ateliers,
        controles,
        sites,
        grillesgroupe,
        paramsites,
        profils,
        secteurs,
        statistiquesControles,
        utilisateurs
    };
};

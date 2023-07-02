import axios, { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';

import {
    LOGIN,
    QueryControlesParameters,
    QueryPaginationParameters
} from '@big/types';
import { DEFAULT_TIMEOUT } from '@big/validators';

import { atelierREST } from './atelier';
import { authREST } from './auth';
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

export const APP_ID = 'RTI_BO';

export enum ServerRequestHeaders {
    appId = 'x-app-id'
}

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
interface AUTH {
    accessToken: string, expAccess: string, refreshToken: string, expRefresh: string
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

    // Request AppId
    axiosClient.interceptors.request.use(function (config) {
        console.log("REQUEST >>>", config);

        const appData = window.localStorage.getItem("rtiApp");
        console.log("REQUEST >>> APPDATA", appData);

        if (appData) {
            const appJson:AUTH = JSON.parse(appData)
            const { accessToken } = appJson;
            
            console.log("REQUEST >>> APPDATA >>> ACCESSTOKEN", appData);

            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        config.headers[ServerRequestHeaders.appId] = APP_ID;
        console.log("🚀 REQUEST >>> config.headers:", config.headers)

        return config;
    });

    // Response
    axiosClient.interceptors.response.use(function (config) {
        console.log("RESPONSE >>>", config);

        return config;
    },
    async (error) => {
        console.log("🚀 RESPONSE ERROR >>>", error)
        //extracting response and config objects
        const { response, config } = error;

        //checking if error is Aunothorized error
        console.log("🚀 >>> response.status:", response.status)

        if (response.status === 401) {
            const appData = window.localStorage.getItem("rtiApp");

            if(appData) {
                const appJson:AUTH = JSON.parse(appData)
                const { accessToken, expAccess, refreshToken, expRefresh } = appJson;
        
                console.log(">>>>>", { accessToken, expAccess, refreshToken, expRefresh })

                if (Date.parse(expAccess) < Date.now() && Date.parse(expRefresh) < Date.now()) {
                    console.log("REEPONSE > EXPIRED ACCESS")
                    //clear local storage and log user out
                    window.localStorage.removeItem("rtiApp");
                    return error;
                } else if (Date.parse(expAccess) < Date.now() && Date.parse(expRefresh) > Date.now()) {
                    //if refresh token exists in local storage proceed
                    try {
                        //try refreshing token
                        const data = await axiosClient.post("/authentication/refresh", {
                            resfreshToken: refreshToken,
                        });
                        console.log("🚀 Data >", data);

                        const authData = data.data;
                        if (authData) {
                            //if request is successful and token exists in response data
                            //store it in local storage
                            const { accessToken } = authData
                            localStorage.setItem("rtiApp", JSON.stringify(authData));
                            //with new token retry original request
                            config.headers["Authorization"] = `Bearer ${accessToken}`;
                            return axiosClient(config);
                        }
                    } catch (error) {
                        console.log(error);
                    }

                }
            }
        }
    });

    const ateliers = atelierREST<QueryPaginationParameters>({
        client: axiosClient
    });
    const auth = authREST({ client: axiosClient });
    const controles = controleREST<QueryControlesParameters>({
        client: axiosClient
    });
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
        auth,
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

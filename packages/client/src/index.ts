import axios from 'axios';

import { DEFAULT_TIMEOUT } from '@big/validators';

import { atelierREST } from './atelier';
import { siteREST } from './site';

type Host = `https://${string}` | `http://${string}`;

export const CLIENT_API = ({
    host,
    timeout = DEFAULT_TIMEOUT,
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

    const atelier = atelierREST({ client: axiosClient });
    const sites = siteREST({ client: axiosClient });
    return {
        atelier,
        sites,
    };
};

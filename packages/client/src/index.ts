import axios from 'axios';

import { DEFAULT_TIMEOUT } from '@big/validators';

import { atelierREST } from './atelier';
import { siteREST } from './site';
import { grillegroupeREST } from './grillegroupe';
import { paramsiteREST } from './paramsite';
import { profilREST } from './profil';
import { secteurREST } from './secteur';
import { utilisateurREST } from './utilisateur';

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

    const ateliers = atelierREST({ client: axiosClient });
    const sites = siteREST({ client: axiosClient });
    const grillesgroupe = grillegroupeREST({ client: axiosClient });
    const paramsites = paramsiteREST({ client: axiosClient });
    const profils = profilREST({ client: axiosClient });
    const secteurs = secteurREST({ client: axiosClient });
    const utilisateurs = utilisateurREST({ client: axiosClient });

    return {
        ateliers,
        sites,
        grillesgroupe,
        paramsites,
        profils,
        secteurs,
        utilisateurs
    };
};

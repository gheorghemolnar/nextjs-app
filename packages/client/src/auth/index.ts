import type { AxiosInstance } from 'axios';

import { type LOGIN_CREATE } from '@big/types';
import { Schema_Login_RO } from '@big/validators';

export const authREST = ({ client }: { client: AxiosInstance }) => {

    const logIn = async (dto: LOGIN_CREATE) => {
        const response = await client<LOGIN_CREATE>({
            method  : 'POST',
            url     : '/authentication/login',
            headers : {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
            data: JSON.stringify(dto)
        });


        //Check if the response is valid
        Schema_Login_RO.parse(response.data);

        return {
            data: response.data,
        };
    };

    const logOut = async () => {
        const response = await client({
            method : 'GET',
            url    : '/authentication/logout',
        });

        //Check if the response is valid
        // Schema_Login_RO.parse(response.data);

        return {
            data: response.data
        };
    };

    return {
        logIn,
        logOut
    };
};

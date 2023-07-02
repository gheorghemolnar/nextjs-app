import z from 'zod';

export const Schema_Login_Create_DTO = z.object({
    username : z.string(),
    password : z.string()
});

export const Schema_Login_RO = z.object({
    accessToken  : z.string(),
    expAccess    : z.string(),
    refreshToken : z.string(),
    expRefresh   : z.string()
});

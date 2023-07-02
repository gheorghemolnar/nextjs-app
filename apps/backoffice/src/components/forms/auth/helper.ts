import z from 'zod';

import { Schema_Login_Create_DTO } from '@big/validators';

export const formSchema = z.object({
    username: Schema_Login_Create_DTO.shape.username
        .min(2, { message: 'Veuillez saisir au moins 1 charactères.' })
        .max(20, { message: 'Le nom utilisateur doit pas dépasser 20 charactères.' }),
    password: Schema_Login_Create_DTO.shape.password
        .min(2, { message: 'Veuillez saisir le mot de passe.' })
        .max(20, { message: 'Le mot de passe doit pas dépasser 20 charactères.' })
});

export type FormValues = z.infer<typeof formSchema>;

export const defaultValues: FormValues = {
    username : '',
    password : ''
};

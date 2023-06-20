import z from 'zod';

import { Schema_Profil_Create_DTO } from '@big/validators';

export const formSchema = z.object({
    codeprofil: Schema_Profil_Create_DTO.shape.codeprofil
        .min(2, { message: 'Veuillez saisir au moins 1 charactères.' })
        .max(50, {
            message: 'Le code bg ne doit pas dépasser 10 charactères.',
        }),
    libprofil: Schema_Profil_Create_DTO.shape.libprofil
        .min(2, { message: 'Veuillez saisir le libellé.' })
        .max(50, { message: 'Le nom ne doit pas dépasser 50 charactères.' }),
    ordreaff: z.string().regex(/\d{1,10}/, {
        message: 'Veuillez saisir une valeur numérique (max 10 chiffres)',
    }),
});

export type FormValues = z.infer<typeof formSchema>;

export const defaultValues: FormValues = {
    codeprofil : '',
    libprofil  : '',
    ordreaff   : '',
};

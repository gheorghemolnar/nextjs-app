import z from 'zod';

import { Schema_Site_Create_DTO } from '@big/validators';

export const formSchema = z.object({
    codesitebg: Schema_Site_Create_DTO.shape.codesitebg
        .min(2, { message: 'Veuillez saisir au moins 1 charactères.' })
        .max(50, { message: 'Le code bg ne doit pas dépasser 10 charactères.' }),
    codesiterh: Schema_Site_Create_DTO.shape.codesiterh
        .min(2, { message: 'Veuillez saisir au moins 1 charactères.' })
        .max(50, { message: 'Le code bg ne doit pas dépasser 10 charactères.' }),
    libsite: Schema_Site_Create_DTO.shape.libsite
        .min(2, { message: 'Veuillez saisir le libellé.' })
        .max(50, { message: 'Le nom ne doit pas dépasser 50 charactères.' }),
    idsociete: z.string().regex(/\d{1,10}/, {
        message: 'Veuillez saisir une valeur numérique (max 10 chiffres)',
    }),
    ordreaff: z.string().regex(/\d{1,10}/, {
        message: 'Veuillez saisir une valeur numérique (max 10 chiffres)',
    }),
});

export type FormValues = z.infer<typeof formSchema>;

export const defaultValues: FormValues = {
    codesitebg: '',
    codesiterh: '',
    libsite: '',
    idsociete: '',
    ordreaff: '',
};

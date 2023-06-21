import z from 'zod';

import { Schema_Atelier_Create_DTO } from '@big/validators';

export const formSchema = z.object({
    codeAtelier: Schema_Atelier_Create_DTO.shape.codeAtelier
        .min(2, { message: 'Veuillez saisir au moins 1 charactères.' })
        .max(50, { message: 'Le code ne doit pas dépasser 10 charactères.' }),
    libAtelier: Schema_Atelier_Create_DTO.shape.libAtelier
        .min(2, { message: 'Veuillez saisir le libellé.' })
        .max(50, { message: 'Le nom ne doit pas dépasser 50 charactères.' }),
    ordreAff: z.string().regex(/\d{1,10}/, {
        message: 'Veuillez saisir une valeur numérique (max 10 chiffres)',
    }),
});

export type FormValues = z.infer<typeof formSchema>;

export const defaultValues: FormValues = {
    codeAtelier : '',
    libAtelier  : '',
    ordreAff    : '',
};

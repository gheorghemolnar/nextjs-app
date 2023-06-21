import z from 'zod';

import { Schema_Grille_Groupe_Create_DTO } from '@big/validators';

export const formSchema = z.object({
    codegrillegr: Schema_Grille_Groupe_Create_DTO.shape.codegrillegr
        .min(1, { message: 'Veuillez saisir au moins 1 charactères.' })
        .max(20, { message: 'Le code ne doit pas dépasser 20 charactères.' }),
    typegrille: Schema_Grille_Groupe_Create_DTO.shape.typegrille.min(1, {
        message: 'Veuillez saisir le type de grille.'
    }),
    libctrl: Schema_Grille_Groupe_Create_DTO.shape.libctrl
        .min(3, { message: 'Veuillez saisir le libellé.' })
        .max(500, { message: 'Le nom ne doit pas dépasser 500 charactères.' }),
    descctrl: Schema_Grille_Groupe_Create_DTO.shape.descctrl
        .min(3, { message: 'Veuillez saisir le descriptif.' })
        .max(500, {
            message: 'Le descriptif ne doit pas dépasser 500 charactères.'
        })
});

export type FormValues = z.infer<typeof formSchema>;

export const defaultValues: FormValues = {
    codegrillegr : '',
    typegrille   : '',
    libctrl      : '',
    descctrl     : ''
};

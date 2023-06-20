import z from 'zod';

import { Schema_Utilisateur_Create_DTO } from '@big/validators';

export const formSchema = z
    .object({
        codeutil: Schema_Utilisateur_Create_DTO.shape.codeutil
            .min(2, { message: 'Veuillez saisir au moins 2 charactères.' })
            .max(50, {
                message: 'Le code ne doit pas dépasser 50 charactères.',
            }),
        idprofil: Schema_Utilisateur_Create_DTO.shape.idprofil.min(1, {
            message: 'Veuillez séléctionnez le profil.',
        }),
        nomutil: Schema_Utilisateur_Create_DTO.shape.nomutil
            .min(2, { message: 'Veuillez saisir le nom.' })
            .max(50, {
                message: 'Le nom ne doit pas dépasser 50 charactères.',
            }),
        preutil: Schema_Utilisateur_Create_DTO.shape.preutil
            .min(2, { message: 'Veuillez saisir le prénom' })
            .max(50, {
                message: 'Le prénom ne doit pas dépasser 50 charactères.',
            }),
        mdputil: Schema_Utilisateur_Create_DTO.shape.mdputil
            .min(2, { message: 'Veuillez saisir le mot de passe.' })
            .max(64, {
                message: 'Le mot de passe ne doit pas dépasser 64 charactères.',
            }),
        confirmPassword: z
            .string()
            .min(2, { message: 'Veuillez saisir le mot de passe.' })
            .max(64, {
                message: 'Le mot de passe ne doit pas dépasser 64 charactères.',
            }),
        matricule: z.string().regex(/\d{1,10}/, {
            message: 'Veuillez saisir une valeur numérique (max 10 chiffres)',
        }),
    })
    .refine((data) => data.mdputil === data.confirmPassword, {
        message : 'Les mots de passe doivent être identiques.',
        path    : ['confirmPassword'],
    });

export type FormValues = z.infer<typeof formSchema>;

export const defaultValues: Partial<FormValues> = {
    codeutil        : '',
    nomutil         : '',
    preutil         : '',
    mdputil         : '',
    confirmPassword : '',
    matricule       : '',
    idprofil        : 0,
};

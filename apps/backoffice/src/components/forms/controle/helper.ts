import z from 'zod';

import { Schema_Controle_Status } from '@big/validators';

export const formSchema = z.object({
    resultatCtrl: Schema_Controle_Status.refine((value) => {
        return value in Schema_Controle_Status.Values, {message: "tetet"}
    }).nullable(),
    commCont: z.string()
        .max(50, { message: 'Le nom ne doit pas dépasser 50 charactères.' }).nullable(),
});

export type FormValues = z.infer<typeof formSchema>;


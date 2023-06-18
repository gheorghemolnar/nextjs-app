import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

// import { useNavigate } from 'react-router-dom';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@big/forms';
import { GRILLE_GROUPE_CREATE } from '@big/types';
import { Button, Input } from '@big/ui';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@big/ui';

import { useCreateGrilleGroupe} from "@backoffice/api/grillegroupe"
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultValues, formSchema, FormValues } from './helper';


export function GrilleGroupeForm() {
//     const navigate = useNavigate();
const { mutateAsync: createGrilleGroupe, isLoading } = useCreateGrilleGroupe();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    async function onSubmit(data: FormValues) {
        const payload: GRILLE_GROUPE_CREATE = {
            ...data,
            creaqui: 'TODO',
        };

        const {data: grillegroupe} = await createGrilleGroupe(payload);

        if (!grillegroupe) return;

        form.reset();
    }

    const { control } = form;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6 flex flex-col align-center"
            >
                <FormField
                    control={control}
                    name="codegrillegr"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code grille groupe</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Code grille groupe"
                                    {...field}
                                    autoComplete="off"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="typegrille"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type grille</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Séléctionnez le type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="M">Matière</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="libctrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Libellé contrôle</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Libellé contrôle"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="descctrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Decriptif contrôle</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Decriptif contrôle"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    className="self-center "
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Enregistrer
                </Button>
            </form>
        </Form>
    );
}

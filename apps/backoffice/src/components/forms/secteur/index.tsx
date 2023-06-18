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
import { SECTEUR_CREATE } from '@big/types';
import { Button, Input } from '@big/ui';

import { useCreateSecteur } from '@backoffice/api/secteur';
import { zodResolver } from '@hookform/resolvers/zod';

import { defaultValues, formSchema, FormValues } from './helper';

export function SecteurForm() {
    // const navigate = useNavigate();
    const { mutateAsync: createSecteur, isLoading } = useCreateSecteur();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    async function onSubmit(data: FormValues) {
        const payload: SECTEUR_CREATE = {
            ...data,
            ordreaff : Number(data.ordreaff),
            creaqui  : 'TODO',
        };

        const { data: secteur } = await createSecteur(payload);

        if (!secteur) return;

        form.reset();
        // navigate(`/`);
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
                    name="codesecteur"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code secteur</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Code secteur"
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
                    name="libsecteur"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Libellé secteur</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Libellé secteur"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="ordreaff"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ordre affichage</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ordre affichage"
                                    {...field}
                                    autoComplete="off"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    className="self-center"
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

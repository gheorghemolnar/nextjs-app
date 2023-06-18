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
import { PROFIL_CREATE } from '@big/types';
import { Button, Input } from '@big/ui';

import { useCreateProfil } from '@backoffice/api/profil';
import { zodResolver } from '@hookform/resolvers/zod';

import { defaultValues, formSchema, FormValues } from './helper';

export function ProfilForm() {
    // const navigate = useNavigate();
    const { mutateAsync: createProfil, isLoading } = useCreateProfil();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    async function onSubmit(data: FormValues) {
        const payload: PROFIL_CREATE = {
            ...data,
            ordreaff : Number(data.ordreaff),
            creaqui  : 'TODO',
        };

        const { data: site } = await createProfil(payload);

        if (!site) return;

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
                    name="codeprofil"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code profil</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Code profil"
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
                    name="libprofil"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Libellé profil</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Libellé profil"
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

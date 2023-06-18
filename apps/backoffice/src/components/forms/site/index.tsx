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
import { SITE_CREATE } from '@big/types';
import { Button, Input } from '@big/ui';

import { useCreateSite } from '@backoffice/api/site';
import { zodResolver } from '@hookform/resolvers/zod';

import { defaultValues, formSchema, FormValues } from './helper';

export function SiteForm() {
    // const navigate = useNavigate();
    const { mutateAsync: createSite, isLoading } = useCreateSite();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    async function onSubmit(data: FormValues) {
        const payload: SITE_CREATE = {
            ...data,
            idsociete : Number(data.idsociete),
            ordreaff : Number(data.ordreaff),
            creaqui  : 'TODO',
        };

        const { data: site } = await createSite(payload);

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
                    name="codesiterh"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code site bg</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Code site bg"
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
                    name="codesiterh"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code site rh</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Code site rh"
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
                    name="libsite"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Libellé site</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Libellé site"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="idsociete"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Id société</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Id société"
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

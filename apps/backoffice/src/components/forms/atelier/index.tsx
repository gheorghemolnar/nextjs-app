import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

// import { useNavigate } from 'react-router-dom';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@big/forms';
import { ATELIER_CREATE } from '@big/types';
import { Button, Input } from '@big/ui';

import { useCreateAtelier } from '@backoffice/api/atelier';
import { zodResolver } from '@hookform/resolvers/zod';

import { defaultValues, formSchema, FormValues } from './helper';

export function AtelierForm() {
    // const navigate = useNavigate();
    const { mutateAsync: createAtelier, isLoading } = useCreateAtelier();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    async function onSubmit(data: FormValues) {
        const payload: ATELIER_CREATE = {
            ...data,
            ordreAff : Number(data.ordreAff),
            creaQui  : 'TODO'
        };

        const { data: atelier } = await createAtelier(payload);

        if (!atelier) return;

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
                    name="codeAtelier"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code atelier</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Code atelier"
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
                    name="libAtelier"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Libellé atelier</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Libellé atelier"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="ordreAff"
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

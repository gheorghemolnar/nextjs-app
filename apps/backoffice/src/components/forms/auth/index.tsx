import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@big/forms';
import { LOGIN_CREATE } from '@big/types';
import { Button, Input } from '@big/ui';

import { useLogin } from '@backoffice/api/auth';
import { zodResolver } from '@hookform/resolvers/zod';

import { defaultValues, formSchema, FormValues } from './helper';

export function LoginForm() {
    const navigate = useNavigate();
    const { mutateAsync: logIn, isLoading } = useLogin();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    async function onSubmit(data: FormValues) {
        const payload: LOGIN_CREATE = {
            ...data
        };

        const { data: response } = await logIn(payload);

        
        if (!response) return;
        
        window.localStorage.setItem('rtiApp', JSON.stringify(response));
        form.reset();
        navigate("/")
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
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom utilisateur</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nom utilisateur"
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Mot de passe"
                                    {...field}
                                    type="password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    variant="outline"
                    className="self-center"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Me connecter
                </Button>
            </form>
        </Form>
    );
}

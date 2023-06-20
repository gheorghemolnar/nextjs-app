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
import { UTILISATEUR_CREATE } from '@big/types';
import {
    Button,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@big/ui';

import { useCreateUtilisateur } from '@backoffice/api/utilisateur';
import { zodResolver } from '@hookform/resolvers/zod';

import { defaultValues, formSchema, FormValues } from './helper';

export function UtilisateurForm() {
    // const navigate = useNavigate();
    const { mutateAsync: createUtilisateur, isLoading } =
        useCreateUtilisateur();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    async function onSubmit(data: FormValues) {
        const payload: UTILISATEUR_CREATE = {
            ...data,
            idprofil  : Number(data.idprofil),
            matricule : Number(data.matricule),
            creaqui   : 'TODO',
        };

        const { data: site } = await createUtilisateur(payload);

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
                    name="nomutil"
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
                    name="preutil"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prénom utilisateur</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Prénom utilisateur"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="codeutil"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code utilisateur</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Code utilisateur"
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
                    name="matricule"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Matricule utilisateur</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Matricule utilisateur"
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
                    name="idprofil"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Profile</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={`${field.value}`}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Séléctionnez un profil" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="1">
                                        Beta-Testeur
                                    </SelectItem>
                                    <SelectItem value="2">
                                        Informatique
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>

                <FormField
                    control={control}
                    name="mdputil"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Mot de passe"
                                    {...field}
                                    type="password"
                                    autoComplete="off"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmation mot de passe</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Confirmation mot de passe"
                                    {...field}
                                    type="password"
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

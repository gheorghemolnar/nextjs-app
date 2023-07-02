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
import { CONTROLE, CONTROLE_EDIT } from '@big/types';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@big/ui';

import { useEditControle } from '@backoffice/api/controle';
import { zodResolver } from '@hookform/resolvers/zod';

import { formSchema, FormValues } from './helper';

export function ControleForm({controle: {idControle, commCont, resultatCtrl}}: {controle: CONTROLE}) {

    console.log("🚀 > ControleForm > controle:", {idControle, commCont, resultatCtrl});
    
    // const navigate = useNavigate();
    const { mutateAsync: updateControle, isLoading } = useEditControle(idControle);
    const defaultValues = { commCont, resultatCtrl }

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    async function onSubmit(data: FormValues) {
        const payload: any = {
            ...data,
            //idControle : idControle,
            modifQui: 'TODO'
        };

        const newPayload = Object.entries(payload).map(([key, value]) => ({
            path : `/${key.toLowerCase()}`,
            value,
            op   : "replace"
        }))
        console.log("🚀 ~ file: index.tsx:46 ~ newPayload ~ newPayload:", newPayload)

        
        const controle = await updateControle(newPayload);

        if (!controle) return;

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
                    name="resultatCtrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Résultat contrôle</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={`${field.value}`}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Séléctionnez le résultat" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="C">
                                        Conforme
                                    </SelectItem>
                                    <SelectItem value="NC">
                                        Non Conforme
                                    </SelectItem>
                                    <SelectItem value="NV">
                                        Non Vu
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="commCont"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Commentaire</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Commentaire"
                                    {...field}
                                    
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
                    Mettre à jour
                </Button>
            </form>
        </Form>
    );
}

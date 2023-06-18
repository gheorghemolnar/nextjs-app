// import { useNavigate } from 'react-router-dom';
// import * as z from 'zod';

// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
//     useForm,
// } from '@big/forms';
// import { Button, Input, toast } from '@big/ui';

// import { IResponseRO } from '@/lib/services';
// import { PROFIL } from '@/types/schema';
// import { getUrlBase } from '@backoffice/lib/utils';
// import { zodResolver } from '@hookform/resolvers/zod';

// const URL_BASE = getUrlBase();

// const formSchema = z.object({
//     codeprofil: z
//         .string()
//         .min(2, { message: 'Veuillez saisir au moins 1 charactères.' })
//         .max(50, { message: 'Le code ne doit pas dépasser 10 charactères.' }),
//     libprofil: z
//         .string()
//         .min(2, { message: 'Veuillez saisir le libellé.' })
//         .max(50, { message: 'Le nom ne doit pas dépasser 50 charactères.' }),
//     ordreaff: z.string().regex(/\d{1,10}/, {
//         message: 'Veuillez saisir une valeur numérique (max 10 chiffres)',
//     }),
// });

// type FormValues = z.infer<typeof formSchema>;

// const defaultValues: Partial<FormValues> = {
//     codeprofil : '',
//     libprofil  : '',
//     ordreaff   : '',
// };

// export default function ProfileForm() {
//     const navigate = useNavigate();

//     const form = useForm<FormValues>({
//         resolver: zodResolver(formSchema),
//         defaultValues,
//     });
//     const {
//         formState: { isSubmitting },
//     } = form;

//     async function onSubmit(data: FormValues) {
//         const payload: PROFIL = {
//             ...data,
//             ordreaff : Number(data.ordreaff),
//             creaqui  : 'TODO',
//         };

//         const response = await fetch(`${URL_BASE}/api/utilisateurs`, {
//             method  : 'POST',
//             headers : {
//                 Accept         : 'application/json',
//                 'Content-Type' : 'application/json',
//             },
//             body: JSON.stringify(payload),
//         });

//         const result: IResponseRO = await response.json();
//         if (result.status === '900') {
//             toast({
//                 title       : "L'erreur suivante est survenue:",
//                 description : (
//                     <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//                         <p className="text-white">
//                             {result.errorMessage.split(':')[1]}
//                         </p>
//                     </div>
//                 ),
//             });
//         } else {
//             form.reset();
//             navigate('/');

//             toast({
//                 title       : 'Création profil:',
//                 description : (
//                     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//                         <code className="text-white">
//                             {'Le secteur a été créé'}
//                         </code>
//                     </pre>
//                 ),
//             });
//         }
//     }

//     return (
//         <Form {...form}>
//             <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="w-2/3 space-y-6 flex flex-col align-center"
//             >
//                 <FormField
//                     control={form.control}
//                     name="codeprofil"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Code profil</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     placeholder="Code profil"
//                                     {...field}
//                                     autoComplete="off"
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="libprofil"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Libellé profil</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     placeholder="Libellé profil"
//                                     {...field}
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="ordreaff"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Ordre affichage</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     placeholder="Ordre affichage"
//                                     {...field}
//                                     autoComplete="off"
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <Button
//                     className="self-center"
//                     type="submit"
//                     disabled={isSubmitting}
//                 >
//                     Enregistrer
//                 </Button>
//             </form>
//         </Form>
//     );
// }

"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { USER } from "@/types/schema";
import { IResponseRO } from "@/lib/services";
import { getUrlBase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/react-hook-form/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";

const userFormSchema = z
  .object({
    codeutil: z
      .string()
      .min(2, { message: "Veuillez saisir au moins 2 charactères." })
      .max(50, { message: "Le code ne doit pas dépasser 50 charactères." }),
    idprofil: z
      .string()
      .min(1, { message: "Veuillez séléctionnez le profil." }),
    nomutil: z
      .string()
      .min(2, { message: "Veuillez saisir le nom." })
      .max(50, { message: "Le nom ne doit pas dépasser 50 charactères." }),
    preutil: z
      .string()
      .min(2, { message: "Veuillez saisir le prénom" })
      .max(50, { message: "Le prénom ne doit pas dépasser 50 charactères." }),
    mdputil: z
      .string()
      .min(2, { message: "Veuillez saisir le mot de passe." })
      .max(64, {
        message: "Le mot de passe ne doit pas dépasser 64 charactères."
      }),
    confirmPassword: z
      .string()
      .min(2, { message: "Veuillez saisir le mot de passe." })
      .max(64, {
        message: "Le mot de passe ne doit pas dépasser 64 charactères."
      }),
    matricule: z.string().regex(/\d{1,10}/, {
      message: "Veuillez saisir une valeur numérique (max 10 chiffres)"
    })
  })
  .refine((data) => data.mdputil === data.confirmPassword, {
    message: "Les mots de passe doivent être identiques.",
    path: ["confirmPassword"]
  });

type UserFormValues = z.infer<typeof userFormSchema>;

const defaultValues: Partial<UserFormValues> = {
  codeutil: "",
  nomutil: "",
  preutil: "",
  mdputil: "",
  matricule: "",
  idprofil: ""
};

const URL_BASE = getUrlBase();

export function UtilisateurForm() {
  const router = useRouter();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues
  });
  const {
    formState: { isSubmitting }
  } = form;

  async function onSubmit(data: UserFormValues) {
    const payload: USER = {
      ...data,
      idprofil: Number(data.idprofil),
      matricule: Number(data.matricule),
      creaqui: "TODO"
    };

    const response = await fetch(`${URL_BASE}/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result: IResponseRO = await response.json();
    if (result.status !== "900") {
      form.reset();
      router.replace("/");

      toast({
        title: "Création utilisateur:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{"L'utilisateur a été créé"}</code>
          </pre>
        )
      });
    } else {
      toast({
        title: "L'erreur suivante est ssurvenue:",
        description: (
          <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <p className="text-white">{result.errorMessage.split(":")[1]}</p>
          </div>
        )
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
          name="idprofil"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Séléctionnez un profil" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Beta-Testeur</SelectItem>
                  <SelectItem value="2">Informatique</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
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
          control={form.control}
          name="preutil"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom utilisateur</FormLabel>
              <FormControl>
                <Input placeholder="Prénom utilisateur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
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
          control={form.control}
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

        <Button type="submit" disabled={isSubmitting}>
          Enregister
        </Button>
      </form>
    </Form>
  );
}
